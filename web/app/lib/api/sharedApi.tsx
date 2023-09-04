import { MarketCapFilter } from '@/app/components/FilterContextProvider'
import { TYPE_GROUPS, TypeGroupLabel } from '../MARKET_CAP_BUCKETS'

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://tendenz-server.fly.dev'

export type ApiQuery = {
	page?: number
	marketCap?: MarketCapFilter
	typeGroups?: TypeGroupLabel[]
}

export const getStocksURL = (querry?: ApiQuery) => {
	const { typeGroups, marketCap, page } = querry ?? {}

	const types = typeGroupsLabelToTypes(typeGroups ?? [])

	const stockTypesStrings = types ? types.map(type => 'type=' + type) : ''
	const minMarketCapString = marketCap?.min
		? 'minMarketCap=' + marketCap?.min
		: ''

	const maxMarketCapString =
		marketCap?.max !== Infinity ? 'maxMarketCap=' + marketCap?.max : ''

	const appendStrings = [
		minMarketCapString,
		maxMarketCapString,
		...stockTypesStrings,
	]
	const appendString = appendStrings.join('&')

	const url = BASE_URL + `/us-stocks/daily/${page || ''}?` + appendString
	console.debug('url :>> ', url)
	return url
}

function typeGroupsLabelToTypes(typeGroups: TypeGroupLabel[]) {
	return typeGroups.flatMap(label =>
		TYPE_GROUPS.filter(group => group.label === label).flatMap(
			typeGroup => typeGroup.types,
		),
	)
}
