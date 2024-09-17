import { addFormSchema } from '$lib/formSchema';
import {superValidate} from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	return {
		form : await superValidate(zod(addFormSchema))
	};
});
