import { stockTypes } from '@tendenz/types'

export const usStocksDailyQuerySchema = {
	type: 'object',
	properties: {
		minMarketCap: {
			type: 'integer',
			minimum: 0,
		},
		maxMarketCap: {
			type: 'integer',
			minimum: 0,
		},
		stockTypes: {
			type: 'array',
			items: {
				type: 'string',
				enum: Object.keys(stockTypes),
			},
		},
	},
	required: [''],
} as const

export const usStocksDailyParams = {
	type: 'object',
	properties: {
		page: {
			type: 'integer',
			minimum: 0,
		},
	},
} as const
