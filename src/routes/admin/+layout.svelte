<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar>
	{@render navLink({ href: '/admin', text: 'D' })}
</Navbar>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a {href}>{text}</a>
{/snippet}
