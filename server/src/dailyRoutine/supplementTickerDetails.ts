import { ok } from 'assert'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { ITickerDetailsResults } from '../lib/polygonApi/polygonTypes.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'

export async function supplementTickerDetails(
	db: DatabaseApi,
	stocksApi: StocksApi,
) {
	const date = new Date()
	date.setDate(date.getDate() - 7)
	const tickersWithoutMarketCap = await db.getStocksWithoutMcOnGtDate(date)
	ok(tickersWithoutMarketCap)

	if (tickersWithoutMarketCap.length === 0) {
		console.info('No stocks without market cap. Skipping...')
		return false
	}

	for (const { ticker } of tickersWithoutMarketCap) {
		try {
			await processTicker(db, stocksApi, ticker)
		} catch (e) {
			console.error(e)
		}
	}
}

async function processTicker(
	db: DatabaseApi,
	stocksApi: StocksApi,
	ticker: string,
) {
	const mostRecentDaily = await db.getMostRecentDaily(ticker)
	ok(mostRecentDaily)

	const { date, close } = mostRecentDaily
	const dateString = formatDateString(date)

	console.group(`Updating ${ticker} on ${dateString}`)
	const rawDetails = await stocksApi.getTickerDetails(ticker, dateString)
	ok(rawDetails)

	const { marketCapData, detailsRest } = parseDetails(rawDetails)

	await db.updateStocks(ticker, {
		...detailsRest,
	})

	if (Object.keys(marketCapData).length > 0) {
		await updateMarketCap(db, ticker, date, close, marketCapData)
	}

	console.groupEnd()
}

function parseDetails(rawDetails: ITickerDetailsResults) {
	const {
		market_cap: marketCap,
		weighted_shares_outstanding: weightedSharesOutstanding,
		share_class_shares_outstanding: shareClassSharesOutstanding,
		name,
		active,
		cik,
		description,
		locale,
		market,
		type,
		sic_code: sicCode,
		sic_description: sicDescription,
		composite_figi: compositeFigi,
		share_class_figi: shareClassFigi,
		currency_name: currencyName,
		primary_exchange: primaryExchange,
		ticker_root: tickerRoot,
		source_feed: sourceFeed,
	} = rawDetails

	const marketCapData = {
		marketCap,
		weightedSharesOutstanding,
		shareClassSharesOutstanding,
	}

	const detailsRest = {
		name,
		active,
		cik,
		description,
		locale,
		market,
		type,
		sicCode,
		sicDescription,
		compositeFigi,
		shareClassFigi,
		currencyName,
		primaryExchange,
		tickerRoot,
		sourceFeed,
	}

	detailsRest.sicCode = Number(sicCode)
	detailsRest.cik = Number(cik)

	return { marketCapData, detailsRest }
}

async function updateMarketCap(
	db: DatabaseApi,
	ticker: string,
	date: Date,
	close: number,
	marketCapData: {
		marketCap?: number
		weightedSharesOutstanding?: number
		shareClassSharesOutstanding?: number
	},
) {
	let marketCap: number | undefined = undefined

	if (marketCapData.weightedSharesOutstanding) {
		marketCap = marketCapData.weightedSharesOutstanding * close
	} else if (marketCapData.shareClassSharesOutstanding) {
		marketCap = marketCapData.shareClassSharesOutstanding * close
	} else if (marketCapData.marketCap) {
		marketCap = marketCapData.marketCap
	}

	if (!marketCap) return

	console.debug(`Updating market cap: ${marketCap}`)

	await db.updateDaily(ticker, date, {
		marketCap,
	})
}
