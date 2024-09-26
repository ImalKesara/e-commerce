import { loginFormSchema } from '$lib/formSchema';
import { fail } from '@sveltejs/kit';
import { request } from 'http';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '../../hooks.server.js';


export const load = async () => {
	return {
		form: await superValidate(zod(loginFormSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const userId = generateId(15);
		const hashedPassword  = await new Argon2id().hash(form.data.password);
		await db.user.create({
			
		})

	}
};
