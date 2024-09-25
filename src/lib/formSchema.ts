import { z } from 'zod';
export const addFormSchema = z.object({
	name: z.string().min(3).max(10),
	priceInCent: z.number({ coerce: true }),
	description: z.string().min(5),
	file: z
		.instanceof(File, { message: 'Please upload a file...' })
		.refine((f) => f.size > 0, 'required'),
	image: z
		.instanceof(File, { message: 'Please upload a Image...' })
		.refine((f) => f.size > 0 || f.type.startsWith('image/'), 'Max 100kb upload size')
});

export const loginFormSchema = z.object({
	username: z.string().min(5),
	password: z.string().min(8)
});
