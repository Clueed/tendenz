export interface tendenzApiSigmaYesterdayDay {
	close: number
	logReturn: number
	date: string
}

export interface tendenzApiSigmaYesterday {
	ticker: string
	name: string | null
	sigma: number
	weight: number
	marketCap: number
	stdLogReturn: number
	meanLogReturn: number
	sampleSize: number
	last: tendenzApiSigmaYesterdayDay
	secondLast: tendenzApiSigmaYesterdayDay
}

export const getStocksURL = (page: number, minMarketCap: number) =>
	`https://tendenz-server.fly.dev/${page}?minMarketCap=${minMarketCap}`