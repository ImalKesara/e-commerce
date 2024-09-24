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

<PageHeader>Customers</PageHeader>
{#if data.users.length > 0}
	{@render userTable()}
{:else}
	<p>No Customers Found 💥</p>
{/if}

{#snippet userTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Email</Table.Head>
				<Table.Head>Orders</Table.Head>
				<Table.Head>Value</Table.Head>
				<Table.Head class="w-0">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as user}
				<Table.Row>
					<Table.Cell class="font-medium">{user.email}</Table.Cell>
					<Table.Cell>{formatNumber(user.order.length)}</Table.Cell>
					<Table.Cell
						>{formatCurrency(
							user.order.reduce((sum, cur) => sum + cur.priceInCent, 0) / 100
						)}</Table.Cell
					>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<EllipsisVertical />

								<span class="sr-only">Actions</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<!-- delete user -->
								<form action="?/deleteUser" method="POST" use:enhance>
									<button type="submit" class="w-full text-destructive">
										<DropdownMenu.Item>Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="p_id" value={user.u_id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
