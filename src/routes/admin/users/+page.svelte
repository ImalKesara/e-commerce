<script lang="ts">
	//cni cmd
	import { Button } from '$lib/components/ui/button';
	import { CheckCheck } from 'lucide-svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	import { ListCollapse } from 'lucide-svelte';
	import { CircleX } from 'lucide-svelte';
	import { X } from 'lucide-svelte';
	import { formatCurrency, formatNumber } from '$lib/utils';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	import { EllipsisVertical } from 'lucide-svelte';

	let { data } = $props();
</script>

<PageHeader>Custormers</PageHeader>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Availabel for purchase</span>
			</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head>Order</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.product as productz}
			<Table.Row>
				<Table.Cell class="font-medium">
					{#if productz.isAvailableForPurchase}
						<!-- <span>Available</span> -->
						<CheckCheck />
					{:else}
						<!-- <span>Unavailable</span> -->
						<CircleX />
					{/if}
				</Table.Cell>
				<Table.Cell>{productz.p_name}</Table.Cell>
				<Table.Cell>{formatCurrency(productz.priceInCents / 100)}</Table.Cell>
				<Table.Cell>{formatNumber(productz._count.order)}</Table.Cell>
				<Table.Cell class="text-right">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<EllipsisVertical />

							<span class="sr-only">Actions</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item href="/admin/products/{productz.p_id}/download" download
								>Download</DropdownMenu.Item
							>
							<!-- Edit function -->
							<DropdownMenu.Item href="/admin/products/{productz.p_id}/edit">Edit</DropdownMenu.Item
							>
							<!-- toggle availability -->
							<form action="?/toggleAvailability" method="POST" use:enhance>
								<button type="submit" class="w-full">
									<DropdownMenu.Item>
										{#if productz.isAvailableForPurchase}
											Deactive
										{:else}
											Activate
										{/if}
									</DropdownMenu.Item>
								</button>
								<input type="hidden" name="p_id" value={productz.p_id} />
								<input
									type="checkbox"
									name="isAvailableForPurchase"
									class="hidden"
									checked={!productz.isAvailableForPurchase}
								/>
							</form>
							<!-- delete -->
							<form action="?/deleteProduct" method="POST" use:enhance>
								<button class="w-full text-destructive" disabled={productz._count.order > 0}>
									<DropdownMenu.Item type="submit" disabled={productz._count.order > 0}>
										Delete
									</DropdownMenu.Item>
								</button>
								<input type="hidden" name="p_id" value={productz.p_id} />
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
