import { stockTypes } from '@tendenz/types'
// import { JSONSchema7 } from 'json-schema' // add for autocomplete

export const usStocksDailyQuerySchema = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
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
} as const

export const usStocksDailyParams = {
	$schema: 'https://json-schema.org/draft/2020-12/schema',
	type: 'object',
	properties: {
		page: {
			type: 'integer',
			minimum: 0,
		},
	},
} as const
