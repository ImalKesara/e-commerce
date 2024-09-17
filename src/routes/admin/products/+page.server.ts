import { db } from '../../../hooks.server';

export const load = async () => {
	return {
		product: await db.product.findMany({
			select: {
				p_id: true,
				p_name: true,
				priceInCents: true,
				isAvailableForPurchase: true,
				imagePath: true,
				_count: {
					select: {
						order: true
					}
				}
			},
			orderBy: { p_name: 'asc' }
		})
	};
};
export const actions = {
	toggleAvailability: async ({ request }) => {
		const formData = await request.formData();
		// input hidden one check out <input type ="hidden" name ="p_id" />
		const p_id = formData.get('p_id') as string;
		const isAvailableForPurchase = formData.has('isAvailableForPurchase');
		await db.product.update({
			where: { p_id },
			data: {
				isAvailableForPurchase
			}
		});
	}
};
