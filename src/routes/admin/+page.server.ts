import { db } from '../../hooks.server';

async function getSalesData() {
	const data = await db.order.aggregate({
		_sum: { priceInCent: true },
		_count: true
	});
	return {
		amount: (data._sum.priceInCent || 0) / 100,
        numberofSales : data._count
	};
}

async function getUserData() {
    const userCount = await db.user.count();
}

export const load = async () => {
	return {

    };
};
