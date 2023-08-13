import { Prisma, UsStockDaily } from '@prisma/client'
import { DateTime } from 'luxon'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { DataPoints, SigmaMath } from './SigmaMath.js'

export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		const mostRecentDate = await this.db.getMostRecentDate()
		const dailys = await this.db.getTickersWithNameOnDate(mostRecentDate)

		const results = await Promise.all(
			dailys.map(async ({ ticker, name }) => {
				const result = await this.constructSigmaRow(ticker, name)

				return match(result)
					.with({ success: true }, async ({ success, data: sigmaRow }) => {
						await this.db.createSigmaYesterday(sigmaRow)
						return { ticker, success }
					})
					.with({ success: false }, ({ success, errorCode }) => {
						return { ticker, success, errorCode }
					})
					.exhaustive()
			}),
		)

		SigmaCalculator.logResults(results, dailys.length)
	}

	private async constructSigmaRow(
		ticker: string,
		name: string | undefined,
		now = DateTime.now(),
	): Promise<SigmaCalcResult> {
		const earliestDate = now.minus({ year: 2 })
		const dailys: UsStockDaily[] = await this.db.getDailyInDateRange(
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

		const dataPoints: DataPoints[] = dailys.map(({ close, date }) => {
			return {
				close,
				date,
			}
		})
		const { sigma, n, stdev, mean, last, secondLast } =
			SigmaCalculator.calculate(dataPoints)

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
				lastLogReturn: last.logReturn,
				lastClose: last.close,
				lastDate: last.date,
				secondLastLogReturn: secondLast.logReturn,
				secondLastClose: secondLast.close,
				secondLastDate: secondLast.date,
				marketCap: mostRecentMarketCap,
			},
		}
	}

	static calculate(dataPoints: DataPoints[]) {
		const sortedDailys = SigmaMath.sortByDate(dataPoints, 'asc')
		const LogReturns = SigmaMath.calcLogReturnsAsc(sortedDailys)

		const sortedLogReturns = SigmaMath.sortByDate(LogReturns, 'desc')
		const [lastLogReturn, ...logReturnPopulation] = sortedLogReturns

		const { sigma, n, stdev, mean } = SigmaMath.calcSigma(
			logReturnPopulation.map(r => r.logReturn),
			lastLogReturn.logReturn,
		)

		const secondLastLogReturn = sortedLogReturns[0]

		return {
			sigma,
			n,
			stdev,
			mean,
			last: lastLogReturn,
			secondLast: secondLastLogReturn,
		}
	}

	private static logResults(
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
}

type errorCodes = 'NotEnoughDataPoints' | 'NoMarketCap'

type SigmaCalcResult =
	| { success: false; errorCode: errorCodes }
	| { success: true; data: Prisma.SigmaUsStocksYesterdayCreateInput }
