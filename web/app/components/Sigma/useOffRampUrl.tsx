import { OFFRAMP_NAMES } from '@/app/lib/MARKET_CAP_BUCKETS'
import { tendenzApiSigmaYesterday } from '@tendenz/types'

export function useOffRampUrl(
	entry: tendenzApiSigmaYesterday,
	offRampName: (typeof OFFRAMP_NAMES)[number],
) {
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
	const param =
		type === 'ETF'
			? `etf`
			: getMappedExchange(primaryExchange, wallmineExchangeMap)

	return `https://wallmine.com/${param}/${ticker}`
}

type ExchangeMap = Partial<
	Record<tendenzApiSigmaYesterday['primaryExchange'], string>
>

const wallmineExchangeMap: ExchangeMap = {
	XNAS: 'NASDAQ',
}

const googleExchangeMap: ExchangeMap = {
	XNAS: 'NASDAQ',
	XASE: 'NYSEAMERICAN',
	XNYS: 'NYSE',
	ARCX: 'NYSEARCA',
}

const getMappedExchange = (
	primaryExchange: tendenzApiSigmaYesterday['primaryExchange'],
	map: ExchangeMap,
) => {
	return map[primaryExchange] ?? primaryExchange
}

function generateGoogleFinanceUrl({
	ticker,
	primaryExchange,
}: tendenzApiSigmaYesterday) {
	const exchange = getMappedExchange(primaryExchange, googleExchangeMap)

	return `https://www.google.com/finance/quote/${ticker}:${exchange}`
}
