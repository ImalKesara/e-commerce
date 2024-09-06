<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-background font-sans antialiased">
	<!-- equal to slot we called this is snippets -->
	{@render children()}
</div>
