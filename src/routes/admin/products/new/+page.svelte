<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addFormSchema } from '$lib/formSchema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	let { data } = $props();
	let form = superForm(data.form, {
		validators: zodClient(addFormSchema)
	});
	let { form: formData, enhance, delayed } = form;
</script>

<PageHeader>Add Product</PageHeader>

<form action="/admin/products/new" class="space-y-8" method="POST" enctype="multipart/form-data">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Product name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
