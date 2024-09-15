<script lang="ts">
	//cni cmd
	import { Button } from '$lib/components/ui/button';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	let { data } = $props();
</script>

<div class="flex items-center justify-between gap-4">
	<PageHeader>products</PageHeader>
	<!-- cnx cmd-->
	<Button href="/admin/product/new">Add Products</Button>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Availabel for purchase</span>
			</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.product as product}
			<Table.Row>
				<Table.Cell class="font-medium"></Table.Cell>
				<Table.Cell>Paid</Table.Cell>
				<Table.Cell>Credit Card</Table.Cell>
				<Table.Cell class="text-right">.00</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
