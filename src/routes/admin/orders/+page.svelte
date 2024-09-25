<script lang="ts">
	//cni cmd
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	import { formatCurrency, formatNumber } from '$lib/utils';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	import { EllipsisVertical } from 'lucide-svelte';
	let { data } = $props();
</script>

<PageHeader>Sales 🏷️</PageHeader>
{#if data.orders.length > 0}
	{@render orderTable()}
{:else}
	<p>No Sales Found</p>
{/if}

{#snippet orderTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Product</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Price Paid</Table.Head>
				<Table.Head class="w-0">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as order}
				<Table.Row>
					<Table.Cell class="font-medium">{order.product.p_name}</Table.Cell>
					<Table.Cell>{order.user.email}</Table.Cell>
					<Table.Cell>{formatCurrency(order.priceInCent / 100)}</Table.Cell>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<EllipsisVertical />

								<span class="sr-only">Actions</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<!-- delete orders -->
								<form action="?/deleteOrder" method="POST" use:enhance>
									<button type="submit" class="w-full text-destructive">
										<DropdownMenu.Item>Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="p_id" value={order.o_id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
