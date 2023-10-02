import { MarketCapFilter } from '@/app/lib/stores/filterStore'
import { UsStocksDailyQueryType, stockTypeCode } from '@tendenz/types'
import { TYPE_GROUPS, TypeGroupLabel } from '../CONSTANS'

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://tendenz-server.fly.dev'

export type ApiCall = {
	page: number
	marketCap?: MarketCapFilter
	typeLabels?: TypeGroupLabel[]
}

const filterFalseAndUndefined = (obj: any) => obj !== false && obj !== undefined

export const getStocksURL = (call: ApiCall) => {
	const { page } = call

	const url = new URL(BASE_URL + `/us-stocks/daily/${page}`)

	const query = ToQuery(call)

	Object.entries(query).forEach(obj =>
		appendSearchParams(url.searchParams, obj),
	)

	return url.toString()
}

function appendSearchParams<K extends [string, any]>(
	searchParams: URLSearchParams,
	obj: K,
) {
	const [key, value] = obj

	if (Array.isArray(value)) {
		value.forEach(v => searchParams.append(key, v.toString()))
	} else {
		searchParams.append(key, value.toString())
	}
}

function ToQuery(call: ApiCall): UsStocksDailyQueryType {
	const { typeLabels, marketCap } = call

	const query: UsStocksDailyQueryType = {}

	if (typeLabels) {
		const type = typeLabels && typeGroupsLabelToTypes(typeLabels)
		query.type = type
	}

	if (marketCap) {
		const { min, max } = marketCap
		if (min) query.minMarketCap = min
		if (max) query.maxMarketCap = max
	}

	return query
}

function typeGroupsLabelToTypes(typeGroups: TypeGroupLabel[]): stockTypeCode[] {
	return typeGroups.flatMap(label =>
		TYPE_GROUPS.filter(group => group.label === label).flatMap(
			typeGroup => typeGroup.types,
		),
	)
}
