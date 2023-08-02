'use client'
export function getMarketCapCategory(marketCap: number): string {
	const thresholds = [
		{ cap: 3000000000000, label: '3t' },
		{ cap: 2500000000000, label: '2.5t' },
		{ cap: 2000000000000, label: '2t' },
		{ cap: 1500000000000, label: '1.5t' },
		{ cap: 1000000000000, label: '1t' },
		{ cap: 750000000000, label: '750b' },
		{ cap: 500000000000, label: '500b' },
		{ cap: 250000000000, label: '250b' },
		{ cap: 100000000000, label: '100b' },
		{ cap: 75000000000, label: '75b' },
		{ cap: 50000000000, label: '50b' },
		{ cap: 25000000000, label: '25b' },
		{ cap: 10000000000, label: '10b' },
		{ cap: 7500000000, label: '7.5b' },
		{ cap: 5000000000, label: '5b' },
		{ cap: 2500000000, label: '2.5b' },
		{ cap: 1000000000, label: '1b' },
		{ cap: 750000000, label: '750m' },
		{ cap: 500000000, label: '500m' },
		{ cap: 250000000, label: '250m' },
		{ cap: 100000000, label: '100m' },
		{ cap: 75000000, label: '75m' },
		{ cap: 50000000, label: '50m' },
		{ cap: 25000000, label: '25m' },
		{ cap: 10000000, label: '10m' },
		{ cap: 7500000, label: '7.5m' },
		{ cap: 5000000, label: '5m' },
		{ cap: 2500000, label: '2.5m' },
	]

	for (const threshold of thresholds) {
		if (marketCap > threshold.cap) {
			return threshold.label
		}
	}

	return '1M'
}
