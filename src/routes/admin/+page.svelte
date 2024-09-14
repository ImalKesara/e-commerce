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

<div class="grid grid-cols-1 gap-x-3 md:grid-cols-2 lg:grid-cols-3">
	{@render dashboardCard({
		title: 'Sales',
		subtitle: `${formatNumber(salesData.numberofSales)} Orders`,
		body: `${formatCurrency(salesData.amount)}`
	})}
	{@render dashboardCard({
		title: 'Total Sales',
		subtitle: `${formatNumber(3000)} Orders`,
		body: `${formatCurrency(1500)}`
	})}
	{@render dashboardCard({
		title: 'Total Sales',
		subtitle: `${formatNumber(3500)} Orders`,
		body: `${formatCurrency(1200)}`
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
