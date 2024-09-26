<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginFormSchema } from '$lib/formSchema.js';
	import { enhance } from '$app/forms';
	import { Loader } from 'lucide-svelte';
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema)
	});
	const { form: formData, delayed } = form;
</script>

<form action="" method="POST" class="grid h-screen w-full place-items-center" use:enhance >
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your username below to login to your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<!-- <div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="name@example.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" type= "password" required />
			</div> -->
			<!-- username -->
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$formData.username} />
				</Form.Control>
			</Form.Field>

			<!-- password -->
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} type="password" bind:value={$formData.password} />
				</Form.Control>
			</Form.Field>
			<!--  -->
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" type="submit">
				{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					Login
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
