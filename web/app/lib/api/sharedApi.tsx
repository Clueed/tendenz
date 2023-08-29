export interface tendenzApiSigmaYesterdayDay {
	close: number
	logReturn: number
	date: string
}

export interface tendenzApiSigmaYesterday {
	ticker: string
	name: string | null
	sigma: number
	absSigma: number
	weight: number
	marketCap: number
	stdLogReturn: number
	meanLogReturn: number
	sampleSize: number
	last: tendenzApiSigmaYesterdayDay
	secondLast: tendenzApiSigmaYesterdayDay
}

export const getStocksURL = (page: number, minMarketCap: number) =>
	`http://localhost:3001/us-stocks/daily/${page}?minMarketCap=${minMarketCap}`
