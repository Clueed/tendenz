import { formatDateString, timeout } from '../misc.js'
import { tickerDetails } from '../polygonApi/getTickerDetails.js'
import { prisma } from '../globals.js'

export function calculateMarketCap(
	marketCap: number | undefined,
	weightedSharesOutstanding: number | undefined,
	shareClassSharesOutstanding: number | undefined,
	dailyClose: number,
): number {
	if (marketCap) {
		return marketCap
	}

	let mc = 0

	if (weightedSharesOutstanding) {
		mc = weightedSharesOutstanding * dailyClose
	} else if (shareClassSharesOutstanding) {
		mc = shareClassSharesOutstanding * dailyClose
	}

	return mc
}

async function updateName(
	dbName: string | null,
	apiName: string | undefined,
	ticker: string,
): Promise<void> {
	if (!apiName) {
		console.debug(`Receive no name from API. Skipping...`)
		return
	}

	if (apiName === dbName) {
		console.debug(`Ticker already has name. Skipping...`)
		return
	}

	console.debug(`Updating name to "${apiName}"...`)
	await prisma.usStocks.update({
		where: {
			ticker,
		},
		data: {
			name: apiName,
		},
	})
}

/**
 * Mainly supplements stocks with marketcap data but also with name and other ticker details.
 * Looks at which stocks do not have a market cap in the last 7 days and updates the most recent marketcap available with an api call each.
 *
 */
export async function supplementTickerDetails() {
	let date = new Date()
	date.setDate(date.getDate() - 7)

	const stocksWithoutMarketCap = await prisma.usStocks.findMany({
		where: {
			dailys: {
				none: {
					marketCap: { not: null },
					date: {
						gt: date,
					},
				},
			},
		},
	})

	if (stocksWithoutMarketCap.length === 0) {
		console.info('No stocks without market cap. Skipping...')
		return false
	}

	for (const stock of stocksWithoutMarketCap) {
		const mostRecentDaily = await prisma.usStockDaily.findMany({
			where: {
				ticker: stock.ticker,
			},
			orderBy: { date: 'desc' },
			take: 1,
		})

		const { date, ticker, close } = mostRecentDaily[0]
		const dateString = formatDateString(date)

		console.group(`Updating ${ticker} on ${dateString}`)
		const details = await tickerDetails(ticker, dateString)

		if (!details) {
			console.warn(`No details available. Skipping...`)
			continue
		}

		const {
			name,
			market_cap,
			weighted_shares_outstanding,
			share_class_shares_outstanding,
		} = details

		await updateName(stock.name, name, ticker)

		if (
			!(
				market_cap ||
				weighted_shares_outstanding ||
				share_class_shares_outstanding
			)
		) {
			console.warn(`No market cap data available. Skipping...`)
			console.groupEnd()
			continue
		}

		const marketCap = calculateMarketCap(
			market_cap,
			weighted_shares_outstanding,
			share_class_shares_outstanding,
			close,
		)

		// Probably could be more elegant.
		// If calculateMarketCap is called that
		// means that atleast one of the values is available
		// and there doesn't need to be the following check.
		if (marketCap === 0 || marketCap < 0) {
			console.error(`Could not calculate market cap...(This shouldn't happen!)`)
			console.groupEnd()
			continue
		}

		console.debug(`Updating market cap: ${marketCap}`)
		await prisma.usStockDaily.update({
			where: {
				ticker_date: {
					ticker,
					date,
				},
			},
			data: {
				marketCap,
			},
		})
		console.groupEnd()
	}
}
