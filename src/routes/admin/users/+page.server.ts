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
