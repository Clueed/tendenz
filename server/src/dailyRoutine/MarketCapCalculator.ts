import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'

// TODO: drop error. it's redundant.
// Query already returns also entries which have either wso or scso.
// Not sure whether all the pattern matching/error handling should be dropped or if it'll be needed later.
// It also makes all the functions cohesive.

export class MarketCapCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		console.group('Initiating Market Cap Calculation...')
		const mostRecentDate = await this.db.getMostRecentDate()
		const tickers = await this.getDailys(mostRecentDate)
		const results = await this.recalcMarketCaps(tickers)
		const { successResults, groupedByErrorCode } =
			MarketCapCalculator.structureResults(results)
		console.info(
			`Calcuted sigma for ${successResults.length} out of ${tickers} tickers`,
		)
		Object.keys(groupedByErrorCode).map(key => {
			console.warn(
				`Errors: ${
					groupedByErrorCode[key as MarketCapCalcErrorCodes].length
				}x ${key}`,
			)
		})
		console.groupEnd()
	}
	async getDailys(date: Date) {
		const tickers = await this.db.getDailysForMarketCapCalc(date)
		console.info(
			`Found ${
				tickers.length
			} tickers which qualify for market cap calculation ${formatDateString(
				date,
			)}`,
		)
		return tickers
	}

	async recalcMarketCaps(
		dailys: { ticker: string; close: number; date: Date }[],
	) {
		const limit = pLimit(5)
		const results = await Promise.all(
			dailys.map(({ ticker, close, date }) =>
				limit(async () => {
					const result = await this.calcMarketCapOfTicker(ticker, close)
					return await this.handleCalcMarketCapResult(result, ticker, date)
				}),
			),
		)
		return results
	}

	async calcMarketCapOfTicker(
		ticker: string,
		close: number,
	): Promise<MarketCapCalcResult> {
		const { weightedSharesOutstanding, shareClassSharesOutstanding } =
			await this.getWsoAndScso(ticker)

		if (weightedSharesOutstanding) {
			return {
				success: true,
				data: { marketCap: weightedSharesOutstanding * close },
				ticker,
			}
		}

		if (shareClassSharesOutstanding) {
			return {
				success: true,
				data: { marketCap: shareClassSharesOutstanding * close },
				ticker,
			}
		}

		return { success: false, errorCode: 'NoSharesOutstandingData', ticker }
	}

	async getWsoAndScso(ticker: string) {
		return await this.db.prisma.usStocks.findUniqueOrThrow({
			where: {
				ticker,
			},
			select: {
				weightedSharesOutstanding: true,
				shareClassSharesOutstanding: true,
			},
		})
	}

	handleCalcMarketCapResult(
		result: MarketCapCalcResult,
		ticker: string,
		date: Date,
	) {
		return match(result)
			.with({ success: true }, async ({ data: { marketCap } }) => {
				await this.db.updateDaily(ticker, date, { marketCap })
				return { success: true as const, ticker }
			})
			.with({ success: false }, ({ errorCode }) => {
				return { success: false as const, ticker, errorCode }
			})
			.exhaustive()
	}

	private static structureResults(
		results: Omit<MarketCapCalcResult, 'data'>[],
	) {
		const successResults = results.filter(MarketCapCalcIsSuccess)
		const failResults = results.filter(MarketCapCalcIsFailed)

		const groupedByErrorCode = failResults.reduce(
			(group, result) => {
				const { errorCode } = result
				group[errorCode] = group[errorCode] ?? []
				group[errorCode].push(result.ticker)
				return group
			},
			<Record<MarketCapCalcErrorCodes, string[]>>{},
		)

		return {
			successResults,
			failResults,
			groupedByErrorCode,
		}
	}
}

type MarketCapCalcErrorCodes = 'NoSharesOutstandingData'

const MarketCapCalcIsSuccess = (
	result: { success: true } | { success: false },
): result is MarketCapCalcSuccess => result.success === true

const MarketCapCalcIsFailed = (
	result: { success: true } | { success: false },
): result is MarketCapCalcFailed => result.success === false

type MarketCapCalcSuccess = {
	ticker: string
	success: true
	data: { marketCap: number }
}

type MarketCapCalcFailed = {
	ticker: string
	success: false
	errorCode: MarketCapCalcErrorCodes
}

type MarketCapCalcResult = MarketCapCalcSuccess | MarketCapCalcFailed
