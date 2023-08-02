'use client'
export function getMarketCapCategory(marketCap: number): string {
	const thresholds = [
		{ cap: 1000000000000, label: '1T' },
		{ cap: 750000000000, label: '750B' },
		{ cap: 500000000000, label: '500B' },
		{ cap: 250000000000, label: '250B' },
		{ cap: 100000000000, label: '100B' },
		{ cap: 75000000000, label: '75B' },
		{ cap: 50000000000, label: '50B' },
		{ cap: 25000000000, label: '25B' },
		{ cap: 10000000000, label: '10B' },
		{ cap: 7500000000, label: '7.5B' },
		{ cap: 5000000000, label: '5B' },
		{ cap: 2500000000, label: '2.5B' },
		{ cap: 1000000000, label: '1B' },
		{ cap: 750000000, label: '750M' },
		{ cap: 500000000, label: '500M' },
		{ cap: 250000000, label: '250M' },
		{ cap: 100000000, label: '100M' },
		{ cap: 75000000, label: '75M' },
		{ cap: 50000000, label: '50M' },
		{ cap: 25000000, label: '25M' },
		{ cap: 10000000, label: '10M' },
		{ cap: 7500000, label: '7.5M' },
		{ cap: 5000000, label: '5M' },
		{ cap: 2500000, label: '2.5M' },
	]

	for (const threshold of thresholds) {
		if (marketCap > threshold.cap) {
			return threshold.label
		}
	}

	return '1M'
}
