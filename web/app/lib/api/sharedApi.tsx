import { MarketCapFilter } from '@/app/lib/stores/filterStore'
import { TYPE_GROUPS, TypeGroupLabel } from '../CONSTANS'

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://tendenz-server.fly.dev'

export type ApiQuery = {
	page?: number
	marketCap?: MarketCapFilter
	typeLabels?: TypeGroupLabel[]
}

const filterFalseAndUndefined = (obj: any) => obj !== false && obj !== undefined

export const getStocksURL = (querry?: ApiQuery) => {
	const { typeLabels, marketCap, page } = querry ?? {}

	const types = typeLabels && typeGroupsLabelToTypes(typeLabels)
	const stockTypesStrings = types?.map(type => 'type=' + type) || []

	const minMarketCapString =
		marketCap?.min && marketCap?.min !== 0 && 'minMarketCap=' + marketCap?.min
	const maxMarketCapString =
		marketCap?.max &&
		marketCap?.max !== Infinity &&
		'maxMarketCap=' + marketCap?.max

	const appendStrings = [
		minMarketCapString,
		maxMarketCapString,
		...stockTypesStrings,
	]

	const appendString = appendStrings.filter(filterFalseAndUndefined).join('&')

	const url = BASE_URL + `/us-stocks/daily/${page || ''}?` + appendString
	return url
}

function typeGroupsLabelToTypes(typeGroups: TypeGroupLabel[]) {
	return typeGroups.flatMap(label =>
		TYPE_GROUPS.filter(group => group.label === label).flatMap(
			typeGroup => typeGroup.types,
		),
	)
}
