import { Prisma } from '@prisma/client'
import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { PolygonStocksApi } from '../lib/polygonApi/polygonStocksApi.js'
import { ITickerDetailsResults } from '../lib/polygonApi/polygonTypes.js'

export class DetailsSupplementer {
	constructor(
		private db: DatabaseApi,
		private stocksApi: PolygonStocksApi,
	) {}

	async run() {
		const tickers = await this.getTickers()

		const mostRecentDate = await this.db.getMostRecentDate()
		const mostRecentDateString = formatDateString(mostRecentDate)

		const limit = pLimit(2)
		const results = await Promise.all(
			tickers.map(ticker =>
				limit(async () => {
					const result = await this.handleTicker(ticker, mostRecentDateString)

					return match(result)
						.with({ success: true }, async ({ data }) => {
							await this.updateStock(ticker, data.updateData)
							return { success: true as const, ticker }
						})
						.with({ success: false }, ({ errorCode }) => {
							return { success: false as const, ticker, errorCode }
						})
						.exhaustive()
				}),
			),
		)

		this.printResults(results, tickers.length)
	}

	async handleTicker(
		ticker: string,
		dateString: string,
	): Promise<DetailUpdateResult> {
		const details = await this.getTickerDetails(ticker, dateString)

		if (!details) {
			return {
				success: false,
				errorCode: 'NoDataAvailable',
			}
		}

		const parsedDetails = this.parseDetails(details)

		return { success: true, data: { updateData: parsedDetails } }
	}

	private printResults(
		results: (
			| {
					ticker: string
					success: true
			  }
			| {
					ticker: string
					success: false
					errorCode: errorCodes
			  }
		)[],
		dailysLength: number,
	) {
		const successResults = results.filter(({ success }) => success === true)
		const failResults = results.filter(({ success }) => success === false) as {
			ticker: string
			success: false
			errorCode: errorCodes
		}[]

		const groupedByErrorCode = failResults.reduce(
			(group, result) => {
				const { errorCode } = result
				group[errorCode] = group[errorCode] ?? []
				group[errorCode].push(result.ticker)
				return group
			},
			<Record<string, string[]>>{},
		)

		console.info(
			`Calcuted sigma for ${successResults.length} out of ${dailysLength} tickers`,
		)
		Object.keys(groupedByErrorCode).map(key => {
			console.info(`Errors: ${groupedByErrorCode[key].length}x ${key}`)
		})
	}

	async updateStock(ticker: string, data: Prisma.UsStocksUpdateInput) {
		return await this.db.updateStocks(ticker, data)
	}

	async getTickers() {
		// Add different strategies here like sort by sigma
		// sort by date etc.
		const tickers = await this.db.getTickerWithoutDetails()

		return tickers.map(({ ticker }) => ticker)
	}

	async getTickerDetails(ticker: string, dateString: string) {
		return await this.stocksApi.getTickerDetails(ticker, dateString)
	}

	parseDetails(rawDetails: ITickerDetailsResults) {
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
		}

		const parsedDetails = {
			weightedSharesOutstanding,
			shareClassSharesOutstanding,
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

		parsedDetails.sicCode = Number(sicCode)
		parsedDetails.cik = Number(cik)

		return parsedDetails
	}
}

type errorCodes = 'NoDataAvailable'

type DetailUpdateResult =
	| { success: false; errorCode: errorCodes }
	| {
			success: true
			data: { updateData: Prisma.UsStocksUpdateInput }
	  }
