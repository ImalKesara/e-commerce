import { db } from '../../../../../hooks.server.js';
import fs from 'fs/promises';

export const GET = async ({ params: { slug } }) => {
	const product = await db.product.findUnique({
		where: { p_id: slug },
		select: { filePath: true, p_name: true }
	});
	if (!product) return new Response('Prodct does not exist');
	const { size } = await fs.stat(product.filePath);
	const file = await fs.readFile(product.filePath);
	//mp3 , jpg,png......
	const extension = product.filePath.split('.').pop();

	return new Response(file, {
		headers: {
			'Content-Type': `application/${extension}`,
			'Content-Length': size.toString(),
			'Content-Disposition': `attachment;filename=${product.p_name}.${extension}`
		}
	});
};
