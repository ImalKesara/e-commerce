import { superValidate, fail } from 'sveltekit-superforms';
import { db } from '../../../../../hooks.server.js';
import { zod } from 'sveltekit-superforms/adapters';
import { addFormSchema } from '$lib/formSchema.js';
import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';

//                       ---  params.slug ---
export const load = async ({ params: { slug } }) => {
	const product = await db.product.findUnique({
		where: { p_id: slug }
	});
	return {
		form: await superValidate(product, zod(addFormSchema), { errors: false }),
		product
	};
};

export const actions = {
	default: async ({ request, params: { slug } }) => {
		// partial means optional
		const form = await superValidate(
			request,
			zod(addFormSchema.partial({ file: true, image: true }))
		);
		if (!form.valid) {
			return fail(400, { form });
		}
		const product = await db.product.findUnique({ where: { p_id: slug } });
		if (!product) return;
		let filePath = product.filePath;

		//if file exist
		if (form.data.file) {
			await fs.unlink(filePath);
			filePath = `products/${crypto.randomUUID()}-${form.data.file.name}`;
			// me file path eke e file content eka save weeee.
			fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));
		}
		let imagePath = product.imagePath;
		if (form.data.image) {
			await fs.unlink(`static${imagePath}`);
			imagePath = `/products/${crypto.randomUUID()}-${form.data.image.name}`;
			fs.writeFile(imagePath, Buffer.from(await form.data.image.arrayBuffer()));
		}
		try {
			await db.product.update({
				where: { p_id: slug },
				data: {
					p_name: form.data.name,
					description: form.data.description,
					priceInCents: form.data.priceInCent,
					filePath,
					imagePath,
					isAvailableForPurchase: false
				}
			});
		} catch (error) {
			console.error(error);
		}
		redirect(303, '/admin/products');
	}
};
