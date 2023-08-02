'use client'
export function getMarketCapCategory(marketCap: number): string {
	const thresholds = [
		{ cap: 1000000000000, label: '1T' },
		{ cap: 500000000000, label: '500B' },
		{ cap: 100000000000, label: '100B' },
		{ cap: 50000000000, label: '50B' },
		{ cap: 10000000000, label: '10B' },
		{ cap: 1000000000, label: '1B' },
		{ cap: 100000000, label: '100M' },
		{ cap: 50000000, label: '50M' },
		{ cap: 10000000, label: '10M' },
	]

	for (const threshold of thresholds) {
		if (marketCap > threshold.cap) {
			return threshold.label
		}
	}

	return '1M'
}
