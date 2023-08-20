import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'

export class MarketCapCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		const mostRecentDate = await this.db.getMostRecentDate()
		const tickers = await this.getTickers(mostRecentDate)
		const results = await this.recalcMarketCaps(tickers)
		this.printResults(results, tickers.length)
	}
	async getTickers(date: Date) {
		const tickers = await this.db.getDailysByDateWithoutMarketCap(date)
		console.info(
			`Found ${
				tickers.length
			} tickers without market cap for ${formatDateString(date)}`,
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
			}
		}

		if (shareClassSharesOutstanding) {
			return {
				success: true,
				data: { marketCap: shareClassSharesOutstanding * close },
			}
		}

		return { success: false, errorCode: 'NoSharesOutstandingData' }
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
			`Calcuted market cap for ${successResults.length} out of ${dailysLength}`,
		)
		if (groupedByErrorCode)
			Object.keys(groupedByErrorCode).map(key => {
				console.info(`Errors: ${groupedByErrorCode[key].length}x ${key}`)
			})
	}
}

type errorCodes = 'NoSharesOutstandingData'

type MarketCapCalcResult =
	| { success: false; errorCode: errorCodes }
	| {
			success: true
			data: { marketCap: number }
	  }