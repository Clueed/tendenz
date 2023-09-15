import { OFFRAMP_NAMES } from '@/app/lib/MARKET_CAP_BUCKETS'
import { tendenzApiSigmaYesterday } from '@tendenz/types'

export function useOffRampUrl(
	entry: tendenzApiSigmaYesterday,
	offRampName: (typeof OFFRAMP_NAMES)[number],
) {
	console.log('offRampName :>> ', offRampName)
	switch (offRampName) {
		case 'Yahoo Finance': {
			return generateYahooFinanceUrl(entry)
		}
		case 'Wallmine': {
			return generateWallmineUrl(entry)
		}
		case 'Google Finance': {
			return generateGoogleFinanceUrl(entry)
		}
	}

	return assertUnreachable(offRampName)
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

function generateGoogleFinanceUrl({
	ticker,
	primaryExchange,
}: tendenzApiSigmaYesterday) {
	return `https://www.google.com/finance/quote/${ticker}:${primaryExchange}`
}
