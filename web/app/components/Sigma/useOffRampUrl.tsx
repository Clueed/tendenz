import { OFFRAMP_NAMES } from '@/app/lib/MARKET_CAP_BUCKETS'
import { tendenzApiSigmaYesterday } from '@tendenz/types'

export function useOfframpUrl(
	entry: tendenzApiSigmaYesterday,
	offrampName: (typeof OFFRAMP_NAMES)[number],
) {
	console.log('offrampName :>> ', offrampName)
	switch (offrampName) {
		case 'Yahoo Finance': {
			return generateYahooFinanceUrl(entry)
		}
		case 'Wallmine': {
			return generateWallmineUrl(entry)
		}
	}

	return assertUnreachable(offrampName)
}
function assertUnreachable(x: never): never {
	throw new Error("Didn't expect to get here")
}

function generateYahooFinanceUrl({ ticker }: tendenzApiSigmaYesterday) {
	return `https://finance.yahoo.com/quote/${ticker}`
}
function generateWallmineUrl({
	type,
	primaryExchange,
	ticker,
}: tendenzApiSigmaYesterday) {
	const param = type === 'ETF' ? `etf` : `${primaryExchange}`

	return `https://wallmine.com/${param}/${ticker}`
}
