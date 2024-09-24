import { db } from '../../../hooks.server';

export const load = async () => {
	return {
		orders: await db.order.findMany({
			select: {
				o_id: true
			},
			orderBy: {
				o_id: 'asc'
			}
		})
	};
};
