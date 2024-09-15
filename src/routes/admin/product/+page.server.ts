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
