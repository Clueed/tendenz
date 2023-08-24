import { Result, err, ok } from 'neverthrow'
import pLimit from 'p-limit'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import {
	SingleAggsMapping,
	formatDateString,
	getStartAndEndOfDay,
	mapIAggsSingleToTable,
} from '../lib/misc.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'
import { StalenessChecker } from './StalenessChecker.js'

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

					const staleResult = await this.stalenessChecker.check(ticker, dailys)
					if (staleResult.isErr()) {
						return staleResult.mapErr(error => ({
							error,
							ticker,
						}))
					}

					const allMatch = staleResult.value.every(
						({ match }) => match === true,
					)
					if (allMatch) {
						return ok({
							ticker,
							updated: false,
						})
					}

					const updateResult = await this.updateTicker(dailys, ticker)

					if (updateResult.isErr())
						return updateResult.mapErr(results => ({
							updateResults: results,
							ticker,
						}))

					return ok({ ticker, updated: true })
				}),
			),
		)

		const result = Result.combineWithAllErrors(results)

		result.match(
			success => console.info(success),
			error => console.log(error),
		)

		console.groupEnd()
	}

	private async updateTicker(dailys: SingleAggsMapping[], ticker: string) {
		const limit = pLimit(5)
		const updateResults = await Promise.all(
			dailys.map(async daily =>
				limit(async () => this.updateDailyWithRange(ticker, daily)),
			),
		)
		return Result.combineWithAllErrors(updateResults)
	}

	private async updateDailyWithRange(ticker: string, daily: SingleAggsMapping) {
		const { startOfDay, endOfDay } = getStartAndEndOfDay(daily.date)

		const { count } = await this.db.updateDailyInDateRange(
			ticker,
			startOfDay,
			endOfDay,
			daily,
		)

		if (count === 1) return ok({ updated: true })

		return err({
			date: formatDateString(daily.date),
			...(count > 1
				? { errorCode: 'UpdatedMoreThenOneEntryPerDay', updated: true }
				: { errorCode: 'UpdatedLessThenOneEntryPerDay', updated: false }),
		})
	}
}
