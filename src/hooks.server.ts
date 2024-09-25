import { PrismaClient } from '@prisma/client';
import { lucia } from '$lib/server/auth';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import type { Handle } from '@sveltejs/kit';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

export const db = new PrismaClient();

//------------------Lucia auth-------------------------------------------------
//                                client.sessionm client.user
const adapter = new PrismaAdapter(db.session, db.user); // your adapter

//in doc they say add this lib/server/auth.ts
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
// -------------------- hooks code part in doc -------------------------

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		//when u initilize fist time it show some warnings so go to app.ts then u know <3
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
