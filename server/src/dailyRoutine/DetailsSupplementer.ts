import { Prisma } from '@prisma/client'
import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { PLIMIT_CONFIG } from '../lib/PLIMIT_CONFIG.js'
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
		console.group('Initiating detail supplementation...')
		const tickers = await this.getTickers()
		console.info(`Found ${tickers.length} entries without details`)

		const mostRecentDate = await this.db.getMostRecentDate()
		const mostRecentDateString = formatDateString(mostRecentDate)

		const results = await this.supplementTickers(tickers, mostRecentDateString)

		const { successResults, groupedByErrorCode } =
			DetailsSupplementer.structureResults(results)
		console.info(
			`Updated details for ${successResults.length} out of ${tickers} tickers`,
		)
		Object.keys(groupedByErrorCode).map(key => {
			console.warn(
				`Errors: ${
					groupedByErrorCode[key as DetailUpdateErrorCode].length
				}x ${key}`,
			)
		})
		console.groupEnd()
	}

	private async supplementTickers(
		tickers: string[],
		mostRecentDateString: string,
	) {
		const limit = pLimit(PLIMIT_CONFIG.dbBound)
		const results = await Promise.all(
			tickers.map(ticker =>
				limit(async () => {
					const result = await this.constructDetails(
						ticker,
						mostRecentDateString,
					)
					return this.handleDetailsResult(result)
				}),
			),
		)
		return results
	}

	private async handleDetailsResult(
		result: DetailUpdateResult,
	): Promise<Omit<DetailUpdateResult, 'data'>> {
		return match(result)
			.with({ success: true }, async ({ data: { updateData }, ...result }) => {
				await this.updateStock(result.ticker, updateData)
				return { ...result }
			})
			.with({ success: false }, result => result)
			.exhaustive()
	}

	async constructDetails(
		ticker: string,
		dateString: string,
	): Promise<DetailUpdateResult> {
		const details = await this.getTickerDetails(ticker, dateString)

		if (!details) {
			return { ticker, success: false, errorCode: 'NoDataAvailable' }
		}

		const parsedDetails = this.parseDetails(details)

		return { ticker, success: true, data: { updateData: parsedDetails } }
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

	private static structureResults(results: Omit<DetailUpdateResult, 'data'>[]) {
		const successResults = results.filter(DetailUpdateResultIsSuccess)
		const failResults = results.filter(DetailUpdateResultIsFailed)

		const groupedByErrorCode = failResults.reduce(
			(group, result) => {
				const { errorCode } = result
				group[errorCode] = group[errorCode] ?? []
				group[errorCode].push(result.ticker)
				return group
			},
			<Record<DetailUpdateErrorCode, string[]>>{},
		)

		return {
			successResults,
			failResults,
			groupedByErrorCode,
		}
	}
}

const DetailUpdateResultIsSuccess = (
	result: { success: true } | { success: false },
): result is DetailUpdateResultSuccess => result.success === true

const DetailUpdateResultIsFailed = (
	result: { success: true } | { success: false },
): result is DetailUpdateResultFailed => result.success === false

type DetailUpdateErrorCode = 'NoDataAvailable'

type DetailUpdateResultSuccess = {
	ticker: string
	success: true
	data: { updateData: Prisma.UsStocksUpdateInput }
}

type DetailUpdateResultFailed = {
	ticker: string
	success: false
	errorCode: DetailUpdateErrorCode
}

type DetailUpdateResult = DetailUpdateResultSuccess | DetailUpdateResultFailed
