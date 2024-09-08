<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { cn } from '$lib/utils';
	let pathname = $derived($page.url.pathname);
	let { children } = $props();
	type NavLink = {
		href: string;
		text: string;
	};
</script>

<Navbar>
	{@render navLink({ href: '/admin', text: 'Dashboard' })}
	{@render navLink({ href: '/admin/product', text: 'Product' })}
	{@render navLink({ href: '/admin/users', text: 'Customers' })}
	{@render navLink({ href: '/admin/orders', text: 'Orders' })}
</Navbar>

<div class="container my-6">
	{@render children()}
</div>

{#snippet navLink({ href, text }: NavLink)}
	<a
		{href}
		class={cn(
			'p-4 capitalize hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary',
			pathname === href && 'bg-background text-foreground'
		)}>{text}</a
	>
{/snippet}
