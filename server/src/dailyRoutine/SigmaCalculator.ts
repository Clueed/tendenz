import { Prisma } from '@prisma/client'
import { DateTime } from 'luxon'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { SigmaMath } from './SigmaMath.js'

export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		const mostRecentDate = await this.db.getMostRecentDate()
		const dailys = await this.db.getTickersWithNameOnDate(mostRecentDate)

		const results: ({ ticker: string } & Omit<SigmaCalcResult, 'data'>)[] = []
		for (const { ticker, name } of dailys.slice(0, 50)) {
			const result = await this.constructSigmaRow(ticker, name)

			match(result)
				.with({ success: true }, async ({ success, data: sigmaRow }) => {
					//await this.db.createSigmaYesterday(sigmaRow)
					results.push({ ticker, success })
				})
				.with({ success: false }, ({ success, errorCode }) => {
					results.push({ ticker, success, errorCode })
				})
				.exhaustive()
		}

		SigmaCalculator.logResults(results, dailys.length)
	}

	private async constructSigmaRow(
		ticker: string,
		name: string | undefined,
	): Promise<SigmaCalcResult> {
		const now = DateTime.now()
		const earliestDate = now.minus({ year: 2 })
		const dailys = await this.db.getDailyInDateRange(
			ticker,
			earliestDate.toJSDate(),
			now.toJSDate(),
		)

		const minPopulation = 30
		if (dailys.length < minPopulation) {
			return { success: false, errorCode: 'NotEnoughDataPoints' }
		}

		const mostRecentMarketCap = dailys.find(daily => daily.marketCap)?.marketCap
		if (!mostRecentMarketCap) {
			return { success: false, errorCode: 'NoMarketCap' }
		}

		const sortedDailys = SigmaMath.sortByDate(dailys, 'asc')
		const LogReturns = SigmaMath.calcLogReturnsAsc(sortedDailys)

		const sortedLogReturns = SigmaMath.sortByDate(LogReturns, 'desc')
		const [lastLogReturn, secondLastLogReturn, ...logReturnPopulation] =
			sortedLogReturns

		const { sigma, n, stdev, mean } = SigmaMath.calcSigma(
			logReturnPopulation.map(r => r.logReturn),
			lastLogReturn.logReturn,
		)

		return {
			success: true,
			data: {
				ticker,
				name,
				sigma,
				absSigma: Math.abs(sigma),
				stdLogReturn: stdev,
				meanLogReturn: mean,
				sampleSize: n,
				weight: 0,
				lastLogReturn: lastLogReturn.logReturn,
				lastClose: lastLogReturn.close,
				lastDate: lastLogReturn.date,
				secondLastLogReturn: secondLastLogReturn.logReturn,
				secondLastClose: secondLastLogReturn.close,
				secondLastDate: secondLastLogReturn.date,
				marketCap: mostRecentMarketCap,
			},
		}
	}
	private static logResults(results: SigmaCalcResult[], dailysLength: number) {
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
}

type errorCodes = 'NotEnoughDataPoints' | 'NoMarketCap'

type SigmaCalcResult =
	| { success: false; errorCode: errorCodes }
	| { success: true; data: Prisma.SigmaUsStocksYesterdayCreateInput }
