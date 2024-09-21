<script lang="ts">
	import { enhance } from '$app/forms';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { addFormSchema } from '$lib/formSchema.js';
	import { formatCurrency } from '$lib/utils.js';
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Loader } from 'lucide-svelte';
	import { page } from '$app/stores';
	let { data } = $props();
	let form = superForm(data.form, {
		validators: zodClient(addFormSchema)
	});
	const { form: formData, delayed } = form;
	const image = fileProxy(formData, 'image');
	const file = fileProxy(formData, 'file');
</script>

<PageHeader>Edit Product</PageHeader>
<form
	action={`/admin/products/${$page.params.slug}/edit`}
	method="POST"
	enctype="multipart/form-data"
	class="space-y-5"
	use:enhance
>
	<!-- name -->
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Product name</Form.Label>
			<Input {...attrs} type="text" bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- priceInCent -->
	<Form.Field {form} name="priceInCent">
		<Form.Control let:attrs>
			<Form.Label>Price In Cents</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.priceInCent} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="">
		<p class="text-sm font-medium">
			Price In <span class="text-muted-foreground"
				>{formatCurrency($formData.priceInCent / 100)}</span
			>
		</p>
	</div>
	<!-- Description -->
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- File -->
	<Form.Field {form} name="file">
		<Form.Control let:attrs>
			<Form.Label>File</Form.Label>
			<Input {...attrs} type="file" bind:files={$file} />
			<div class="text-muted-foreground">
				{data.product.filePath}
			</div>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- image -->
	<Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Form.Label>Product image</Form.Label>
			<!--                      accept any image file  -->
			<Input {...attrs} accept="image/*" type="file" bind:files={$image} />
			<img src={data.product.imagePath} alt="products" class="h-[300px] w-[600px] object-cover" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button type="submit">
		{#if $delayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			Save
		{/if}
	</Form.Button>
</form>
