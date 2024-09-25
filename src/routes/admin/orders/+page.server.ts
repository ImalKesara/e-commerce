import { db } from '../../../hooks.server';

export const load = async () => {
	return {
		orders: await db.order.findMany({
			select: {
				o_id: true,
				priceInCent: true,
				product: { select: { p_name: true } },
				user: { select: { email: true } }
			},
			orderBy: {
				o_id: 'asc'
			}
		})
	};
};

export const actions = {
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const o_id = formData.get('o_id') as string;
		await db.order.delete({
			where:{o_id}
		})
	}
};
