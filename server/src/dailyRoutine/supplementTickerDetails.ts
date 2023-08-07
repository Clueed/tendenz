import { ok } from 'assert'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'

export async function supplementTickerDetails(
	db: DatabaseApi,
	stocksApi: StocksApi,
) {
	const date = new Date()
	date.setDate(date.getDate() - 7)
	const dateString = formatDateString(date)
	const tickersWithoutMarketCap = await db.getStocksWithoutMcOnGtDate(
		dateString,
	)
	ok(tickersWithoutMarketCap)

	if (tickersWithoutMarketCap.length === 0) {
		console.info('No stocks without market cap. Skipping...')
		return false
	}

	for (const { ticker } of tickersWithoutMarketCap) {
		await processTicker(db, stocksApi, ticker)
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

	const {
		market_cap,
		weighted_shares_outstanding,
		share_class_shares_outstanding,
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

	await db.updateStocks(ticker, {
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
	})

	if (
		market_cap ||
		weighted_shares_outstanding ||
		share_class_shares_outstanding
	) {
		await updateMarketCap(
			db,
			ticker,
			date,
			close,
			market_cap,
			weighted_shares_outstanding,
			share_class_shares_outstanding,
		)
	}

	console.groupEnd()
}

async function updateMarketCap(
	db: DatabaseApi,
	ticker: string,
	date: Date,
	close: number,
	market_cap?: number,
	weighted_shares_outstanding?: number,
	share_class_shares_outstanding?: number,
) {
	let marketCap: number | undefined = undefined

	if (weighted_shares_outstanding) {
		marketCap = weighted_shares_outstanding * close
	} else if (share_class_shares_outstanding) {
		marketCap = share_class_shares_outstanding * close
	} else if (market_cap) {
		marketCap = market_cap
	}

	if (!marketCap) return

	console.debug(`Updating market cap: ${marketCap}`)

	await db.updateDaily(ticker, date, {
		marketCap,
	})
}
