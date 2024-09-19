import { addFormSchema } from '$lib/formSchema';
import { fail, superValidate } from 'sveltekit-superforms';
import fs from 'fs/promises';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '../../../../hooks.server.js';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	return {
		form: await superValidate(zod(addFormSchema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		await fs.mkdir('products', { recursive: true });
		const filePath = `products/${crypto.randomUUID()}-${form.data.file.name}`;
		fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));
		fs.mkdir('static/products', { recursive: true });

		const imagePath = `/products/${crypto.randomUUID()}-${form.data.image.name}`;
		fs.writeFile(`static${imagePath}`, Buffer.from(await form.data.image.arrayBuffer()));
		try {
			await db.product.create({
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
