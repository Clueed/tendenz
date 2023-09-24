import { OFFRAMPS } from '@/app/lib/CONSTANS'
import { tendenzApiSigmaYesterday } from '@tendenz/types'

export function useOffRampUrl(
	entry: tendenzApiSigmaYesterday,
	offRamp: keyof typeof OFFRAMPS,
) {
	switch (offRamp) {
		case 'yahoo': {
			return generateYahooFinanceUrl(entry)
		}
		case 'wallmine': {
			return generateWallmineUrl(entry)
		}
		case 'google': {
			return generateGoogleFinanceUrl(entry)
		}
		case 'finviz': {
			return generateFinvizUrl(entry)
		}
	}

	return assertUnreachable(offRamp)
}

function assertUnreachable(x: never): never {
	throw new Error("Didn't expect to get here")
}

type ExchangeMap = Partial<
	Record<tendenzApiSigmaYesterday['primaryExchange'], string>
>

const getMappedExchange = (
	primaryExchange: tendenzApiSigmaYesterday['primaryExchange'],
	map: ExchangeMap,
) => {
	return map[primaryExchange] ?? primaryExchange
}

const wallmineExchangeMap: ExchangeMap = {
	XNAS: 'NASDAQ',
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

const googleExchangeMap: ExchangeMap = {
	XNAS: 'NASDAQ',
	XASE: 'NYSEAMERICAN',
	XNYS: 'NYSE',
	ARCX: 'NYSEARCA',
}

function generateGoogleFinanceUrl({
	ticker,
	primaryExchange,
}: tendenzApiSigmaYesterday) {
	const exchange = getMappedExchange(primaryExchange, googleExchangeMap)

	return `https://www.google.com/finance/quote/${ticker}:${exchange}`
}
function generateYahooFinanceUrl({ ticker }: tendenzApiSigmaYesterday) {
	return `https://finance.yahoo.com/quote/${ticker}`
}

function generateFinvizUrl(entry: tendenzApiSigmaYesterday) {
	return `https://finviz.com/quote.ashx?t=${entry.ticker}`
}
