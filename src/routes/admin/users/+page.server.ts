import { request } from 'http';
import { db } from '../../../hooks.server';
export const load = async () => {
	return {
		users: await db.user.findMany({
			select: {
				u_id: true,
				email: true,
				order: { select: { priceInCent: true } }
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	};
};
export const actions = {
	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const u_id = formData.get('u_id') as string;
		await db.user.delete({
			where: { u_id }
		});
	}
};
