import { stockTypeCode } from '@tendenz/types'

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://tendenz-server.fly.dev'

export const getStocksURL = (
	page: number,
	minMarketCap: number,
	stockTypes?: stockTypeCode[],
) => {
	const stockTypesString = stockTypes
		? '&type=' + stockTypes?.join('&type=')
		: ''

	const url =
		BASE_URL +
		`/us-stocks/daily/${page}?minMarketCap=${minMarketCap}` +
		stockTypesString

	console.log('url :>> ', url)

	return url
}
