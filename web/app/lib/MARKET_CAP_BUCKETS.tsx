export const MARKET_CAP_BUCKETS = [
	{ label: '10m', minMarketCap: 10000000 },
	{ label: '100m', minMarketCap: 100000000 },
	{ label: '1b', minMarketCap: 1000000000 },
	{ label: '50b', minMarketCap: 50000000000 },
] as const

export type MarketCapBucketLabel = (typeof MARKET_CAP_BUCKETS)[number]['label']

export const TYPE_GROUPS = [
	{
		label: 'stocks',
		types: ['CS', 'OS', 'PFD', 'ADRC', 'ADRP', 'GDR', 'NYRS', 'RIGHT'],
	},
	{ label: 'ETFs', types: ['ETF', 'ETN', 'ETV', 'ETS'] },
	{ label: 'others', types: ['FUND', 'OTHER', 'BOND', 'SP'] },
] as const

export type TypeGroupLabel = (typeof TYPE_GROUPS)[number]['label']
