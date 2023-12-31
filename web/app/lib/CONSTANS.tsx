export const TYPE_GROUPS = [
	{
		label: 'stocks',
		types: ['CS', 'OS', 'PFD', 'ADRC', 'ADRP', 'GDR', 'NYRS', 'RIGHT'],
	},
	{ label: 'ETFs', types: ['ETF', 'ETN', 'ETV', 'ETS'] },
	{
		label: 'others',
		types: [
			'FUND',
			'OTHER',
			'BOND',
			'SP',
			'WARRANT',
			'ADRW',
			'ADRR',
			'BASKET',
			'UNIT',
			'LT',
			'AGEN',
			'EQLK',
		],
	},
] as const
export type TypeGroupLabel = (typeof TYPE_GROUPS)[number]['label']
export const DEFAULT_TYPE_GROUP_LABELS = ['stocks'] as TypeGroupLabel[]

export const DEFAULT_MARKET_CAP = {
	min: 1e9,
	max: Infinity,
}

export const OFFRAMPS = {
	yahoo: 'Yahoo Finance',
	google: 'Google Finance',
	wallmine: 'wallmine',
	finviz: 'FINVIZ',
} as const

export const DEFAULT_OFFRAMP: keyof typeof OFFRAMPS = 'yahoo'
