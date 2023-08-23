import { Prisma } from '@prisma/client'
import pLimit from 'p-limit'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import {
	SingleAggsMapping,
	formatDateString,
	getStartAndEndOfDay,
	mapIAggsSingleToTable,
} from '../lib/misc.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'

export class SplitDetector {
	constructor(
		private db: DatabaseApi,
		private stocksApi: StocksApi,
		private stalenessChecker: StalenessChecker,
		private stopAfterNUpdates: number = 10,
	) {}

	async run() {
		console.group(`Initiating split detector...`)

		const today = formatDateString(new Date())
		const splits = await this.stocksApi.getSplits(today)

		const limit = pLimit(2)
		const results = await Promise.all(
			splits.map(async ({ ticker }) =>
				limit(async () => {
					const dailys = (
						await this.stocksApi.getAllDailysByTicker(ticker)
					).map(mapIAggsSingleToTable)

					const staleResults = await this.stalenessChecker.check(ticker, dailys)

					const allSuccess = staleResults.every(StalenessCheckIsSuccess)
					if (!allSuccess) {
						return {
							success: false,
							staleResults: staleResults,
						}
					}

					const allMatch = staleResults.every(result => result.match === true)
					if (allMatch) {
						return {
							success: true,
							updated: false,
						}
					}

					const limit = pLimit(5)
					const updateResult = await Promise.all(
						dailys.map(async daily =>
							limit(async () => await this.updateEntries(ticker, daily)),
						),
					)

					return { updateResult, ticker }
				}),
			),
		)

		console.groupEnd()
	}

	private async updateEntries(ticker: string, daily: SingleAggsMapping) {
		const { startOfDay, endOfDay } = getStartAndEndOfDay(daily.date)

		const { count } = await this.db.updateDailyInDateRange(
			ticker,
			startOfDay,
			endOfDay,
			daily,
		)

		if (count === 1)
			return {
				success: true,
				updated: true,
			} as const

		return {
			success: false,
			date: formatDateString(daily.date),
			...(count > 1
				? { errorCode: 'UpdatedMoreThenOneEntryPerDay', updated: true }
				: { errorCode: 'UpdatedLessThenOneEntryPerDay', updated: false }),
		} as const
	}
}

const SplitResultIsSuccess = (
	result: { success: true } | { success: false },
): result is SplitResultSuccess => result.success === true

const SplitResultIsFailed = (
	result: { success: true } | { success: false },
): result is SplitResultFailed => result.success === false

type SplitErrorCode = 'NotEnoughDataPoints'

type SplitResultSuccess = {
	ticker: string
	success: true
	adjusted: true | false
	data: { updateData: Prisma.UsStockDailyUpdateInput; date: Date }
}

type SplitResultFailed = {
	ticker: string
	success: false
	errorCode: SplitErrorCode
}

type SplitResult = SplitResultSuccess | SplitResultFailed
