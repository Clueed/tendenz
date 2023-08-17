import { Prisma, UsStockDaily } from '@prisma/client'
import { DateTime } from 'luxon'
import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { DataPoints, SigmaMath } from './SigmaMath.js'
export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		const mostRecentDate = await this.db.getMostRecentDate()
		const dailys = await this.db.prisma.usStockDaily.findMany({
			where: {
				date: mostRecentDate,
				sigma: null,
			},
			select: {
				ticker: true,
			},
		})

		const limit = pLimit(2)
		const results = await Promise.all(
			dailys.map(({ ticker }) =>
				limit(async () => {
					const result = await this.constructSigmaRow(ticker)
					return await this.handleSigmaResult(result, ticker)
				}),
			),
		)

		SigmaCalculator.printResults(results, dailys.length)
	}

	private async handleSigmaResult(result: SigmaCalcResult, ticker: string) {
		return match(result)
			.with(
				{ success: true },
				async ({ success, data: { updateData, date } }) => {
					await this.db.updateDaily(ticker, date, {
						sigma: updateData.sigma,
						sigmaAbs: updateData.sigmaAbs,
						logReturn: updateData.logReturn,
					})
					return { ticker, success }
				},
			)
			.with({ success: false }, ({ success, errorCode }) => {
				return { ticker, success, errorCode }
			})
			.exhaustive()
	}

	private async constructSigmaRow(
		ticker: string,
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

		const dataPoints: DataPoints[] = dailys.map(({ close, date }) => {
			return {
				close,
				date,
			}
		})
		const { sigma, last } = SigmaCalculator.calculate(dataPoints)

		return {
			success: true,
			data: {
				updateData: {
					sigma,
					sigmaAbs: Math.abs(sigma),
					logReturn: last.logReturn,
				},
				date: last.date,
			},
		}
	}

	static calculate(dataPoints: DataPoints[]) {
		const sortedDailys = SigmaMath.sortByDate(dataPoints, 'asc')
		const LogReturns = SigmaMath.calcLogReturnsAsc(sortedDailys)

		const sortedLogReturns = SigmaMath.sortByDate(LogReturns, 'desc')
		const [lastLogReturn, ...logReturnPopulation] = sortedLogReturns

		const { sigma } = SigmaMath.calcSigma(
			logReturnPopulation.map(r => r.logReturn),
			lastLogReturn.logReturn,
		)

		return {
			sigma,
			last: lastLogReturn,
		}
	}

	private static printResults(
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

type errorCodes = 'NotEnoughDataPoints'

type SigmaCalcResult =
	| { success: false; errorCode: errorCodes }
	| {
			success: true
			data: { updateData: Prisma.UsStockDailyUpdateInput; date: Date }
	  }
