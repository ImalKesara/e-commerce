import { db } from '../../../hooks.server';
import fs from 'fs/promises';

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
	},
	deleteProduct: async ({ request }) => {
		const formData = await request.formData();
		const p_id = formData.get('p_id') as string;
		const product = await db.product.findUnique({
			where: {
				p_id
			},
			select: {
				_count: { select: { order: true } }
			}
		});
		//means if there are orders you cant delete products
		if (product && product._count.order > 0) return;
		const deletedProduct = await db.product.delete({
			where: {
				p_id
			}
		});
		await fs.unlink(deletedProduct.filePath);
		await fs.unlink(`static${deletedProduct.imagePath}`);
	}
};
