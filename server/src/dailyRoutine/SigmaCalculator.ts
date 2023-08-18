import { Prisma, UsStockDaily } from '@prisma/client'
import { DateTime } from 'luxon'
import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { DataPoints, SigmaMath } from './SigmaMath.js'
export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		console.group('Initiating sigma calculation...')
		const mostRecentDate = await this.db.getMostRecentDate()
		const tickers = await this.db.getTickersWithoutSigma(mostRecentDate)
		console.info(
			`Updating ${
				tickers.length
			} entries without sigma value on ${formatDateString(mostRecentDate)}`,
		)
		const results = await this.updateTickers(tickers)

		const { successResults, groupedByErrorCode } =
			SigmaCalculator.structureResults(results)
		console.info(
			`Calcuted sigma for ${successResults.length} out of ${tickers} tickers`,
		)
		Object.keys(groupedByErrorCode).map(key => {
			console.warn(`Errors: ${groupedByErrorCode[key].length}x ${key}`)
		})
		console.groupEnd()
	}

	private async updateTickers(tickers: { ticker: string }[]) {
		const limit = pLimit(2)
		const results = await Promise.all(
			tickers.map(({ ticker }) =>
				limit(async () => {
					const result = await this.constructSigmaRow(ticker)
					return await this.handleSigmaResult(result, ticker)
				}),
			),
		)
		return results
	}

	private async constructSigmaRow(
		ticker: string,
		now = DateTime.now(),
		timeRangeInYears = 2,
	): Promise<SigmaCalcResult> {
		const earliestDate = now.minus({ year: timeRangeInYears })
		const dailys: UsStockDaily[] = await this.db.getDailyInDateRange(
			ticker,
			earliestDate.toJSDate(),
			now.toJSDate(),
		)

		const minPopulation = 30
		if (dailys.length < minPopulation) {
			return { success: false, ticker, errorCode: 'NotEnoughDataPoints' }
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
			ticker,
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

	private async handleSigmaResult(
		result: SigmaCalcResult,
		ticker: string,
	): Promise<Omit<SigmaCalcResult, 'data'>> {
		return match(result)
			.with(
				{ success: true },
				async ({ data: { updateData, date }, ...result }) => {
					await this.db.updateDaily(ticker, date, {
						sigma: updateData.sigma,
						sigmaAbs: updateData.sigmaAbs,
						logReturn: updateData.logReturn,
					})
					return result
				},
			)
			.with({ success: false }, result => result)
			.exhaustive()
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

	private static structureResults(results: Omit<SigmaCalcResult, 'data'>[]) {
		const successResults = results.filter(({ success }) => success === true)
		const failResults = results.filter(isFailed)

		const groupedByErrorCode = failResults.reduce(
			(group, result) => {
				const { errorCode } = result
				group[errorCode] = group[errorCode] ?? []
				group[errorCode].push(result.ticker)
				return group
			},
			<Record<errorCode, string[]>>{},
		)

		return {
			successResults,
			failResults,
			groupedByErrorCode,
		}
	}
}

const isFailed = (
	result: { success: true } | { success: false },
): result is ResultFailed => result.success === false

type errorCode = 'NotEnoughDataPoints'

type ResultSucess = {
	ticker: string
	success: true
	data: { updateData: Prisma.UsStockDailyUpdateInput; date: Date }
}

type ResultFailed = { ticker: string; success: false; errorCode: errorCode }

type SigmaCalcResult = ResultSucess | ResultFailed
