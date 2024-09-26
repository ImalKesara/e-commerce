import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	//if there is no user then show login page
	if (!locals.user) {
		redirect(302, '/login');
	}
};

