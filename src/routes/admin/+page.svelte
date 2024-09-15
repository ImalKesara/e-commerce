<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formatCurrency, formatNumber } from '$lib/utils';

	type DashboardCardProps = {
		title: string;
		subtitle: string;
		body: string;
	};

	let { data } = $props();
	let { productData, userData, salesData } = $derived(data);
</script>

<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
	{@render dashboardCard({
		title: 'Sales',
		subtitle: `${formatNumber(salesData.numberofSales)} Orders`,
		body: formatCurrency(salesData.amount)
	})}
	{@render dashboardCard({
		title: 'Customers',
		subtitle: `${formatCurrency(userData.avgValuePerUser)} Average value`,
		body: formatNumber(userData.userCount)
	})}
	{@render dashboardCard({
		title: 'Active Products',
		subtitle: `${formatNumber(productData.inactiveCount)} Inactive`,
		body: formatNumber(productData.activeCount)
	})}
</div>

{#snippet dashboardCard({ title, subtitle, body }: DashboardCardProps)}
	<Card.Root>
		<Card.Header>
			<Card.Title>{title}</Card.Title>
			<Card.Description>{subtitle}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>{body}</p>
		</Card.Content>
	</Card.Root>
{/snippet}
