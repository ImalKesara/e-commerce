<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	type DashboardCardProps = {
		title: string;
		subtitle: string;
		body: string;
	};
</script>

<div class="grid grid-cols-1 gap-x-3 md:grid-cols-2 lg:grid-cols-3">
	{@render dashboardCard({ title: 'Total Sales', subtitle: 'This month', body: '$10,00,000' })}
	{@render dashboardCard({ title: 'Total Sales', subtitle: 'This month', body: '$10,00,000' })}
	{@render dashboardCard({ title: 'Total Sales', subtitle: 'This month', body: '$10,00,000' })}
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
