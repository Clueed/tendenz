import { Prisma, UsStockDaily } from '@prisma/client'
import { DateTime } from 'luxon'
import pLimit from 'p-limit'
import { match } from 'ts-pattern'
import { PLIMIT_CONFIG } from '../lib/PLIMIT_CONFIG.js'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { DataPoints, SigmaMath } from './SigmaMath.js'

interface ISigmaCalcDB {
	getDailyInDateRange(
		ticker: string,
		startdate: Date,
		enddate: Date,
	): Promise<UsStockDaily[]>

	getMostRecentDates(daysMinus?: number): Promise<Date[]>

	getTickersWithoutSigma(dates: Date[]): Promise<string[]>
}

export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		console.group('Initiating sigma calculation...')
		const mostRecentDates = await this.db.getMostRecentDates(2)
		const tickers = await this.db.getTickersWithoutSigma(mostRecentDates)
		console.info(
			`Found ${
				tickers.length
			} entries without sigma value on ${formatDateString(mostRecentDates[0])}`,
		)
		const results = await this.updateTickers(tickers)

		const { successResults, groupedByErrorCode } =
			SigmaCalculator.structureResults(results)
		console.info(
			`Calcuted sigma for ${successResults.length} out of ${tickers.length} tickers`,
		)
		Object.keys(groupedByErrorCode).map(key => {
			console.warn(
				`Errors: ${
					groupedByErrorCode[key as SigmaCalcErrorCode].length
				}x ${key}`,
			)
		})
		console.groupEnd()
	}

	private async updateTickers(tickers: string[]) {
		const limit = pLimit(PLIMIT_CONFIG.apiBound)
		const results = await Promise.all(
			tickers.map(ticker =>
				limit(async () => {
					console.debug('Updating ticker:', ticker)
					const dailys = await this.getDailys(ticker)
					const result = await this.constructSigmaRow(ticker, dailys)
					return await this.handleSigmaResult(result)
				}),
			),
		)
		return results
	}

	async getDailys(ticker: string, now = DateTime.now(), timeRangeInYears = 2) {
		const earliestDate = now.minus({ year: timeRangeInYears })
		return await this.db.getDailyInDateRange(
			ticker,
			earliestDate.toJSDate(),
			now.toJSDate(),
		)
	}

	private async constructSigmaRow(
		ticker: string,
		dailys: Prisma.PromiseReturnType<typeof this.getDailys>,
	): Promise<SigmaCalcResult> {
		console.debug('Constructing sigma row for ticker:', ticker)

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
	): Promise<Omit<SigmaCalcResult, 'data'>> {
		return match(result)
			.with(
				{ success: true },
				async ({ ticker, data: { updateData, date }, ...result }) => {
					await this.db.updateDaily(ticker, date, updateData)
					return { ticker, ...result }
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
		const successResults = results.filter(SigmaCalcResultIsSuccess)
		const failResults = results.filter(SigmaCalcResultIsFailed)

		const groupedByErrorCode = failResults.reduce(
			(group, result) => {
				const { errorCode } = result
				group[errorCode] = group[errorCode] ?? []
				group[errorCode].push(result.ticker)
				return group
			},
			<Record<SigmaCalcErrorCode, string[]>>{},
		)

		return {
			successResults,
			failResults,
			groupedByErrorCode,
		}
	}
}

const SigmaCalcResultIsSuccess = (
	result: { success: true } | { success: false },
): result is SigmaCalcResultSuccess => result.success === true

const SigmaCalcResultIsFailed = (
	result: { success: true } | { success: false },
): result is SigmaCalcResultFailed => result.success === false

type SigmaCalcErrorCode = 'NotEnoughDataPoints' | 'NotRecent'

type SigmaCalcResultSuccess = {
	ticker: string
	success: true
	data: { updateData: Prisma.UsStockDailyUpdateInput; date: Date }
}

type SigmaCalcResultFailed = {
	ticker: string
	success: false
	errorCode: SigmaCalcErrorCode
}

type SigmaCalcResult = SigmaCalcResultSuccess | SigmaCalcResultFailed
