import { Result, err, ok } from 'neverthrow'
import pLimit from 'p-limit'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import {
	SingleAggsMapping,
	formatDateString,
	getStartAndEndOfDay,
	mapIAggsSingleToTable,
} from '../lib/misc.js'
import { IStockSplitResults } from '../lib/polygonApi/polygonTypes.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'
import { StaleError, StalenessChecker } from './StalenessChecker.js'

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

		const results = []

		for (let i = 0; i < splits.length; i += 10) {
			const binResult = await this.handleSplits(splits.slice(i, i + 10))
			results.push(...binResult)

			const comb = Result.combineWithAllErrors(binResult)
			if (comb.isErr()) {
				break
			}

			const updated = binResult.filter(
				s => s.isOk() && s.value.updated === true,
			)
			if (updated.length === 0) {
				break
			}
		}

		const success = results.filter(s => s.isOk())
		const updated = results.filter(s => s.isOk() && s.value.updated === true)

		console.info(`Checked ${success.length} splits`)
		console.info(`Updated ${updated.length}`)

		const errors: (UpdateError | StaleError)[] = []

		for (const r of results) {
			if (r.isErr()) {
				errors.push(...r.error)
			}
		}

		const groupedByError = groupBy(errors, ['errorCode'])

		Object.keys(groupedByError).forEach(key =>
			console.info(`${groupedByError[key].length}x ${key}`),
		)

		console.groupEnd()
	}

	private async handleSplits(splits: IStockSplitResults[]) {
		const limit = pLimit(2)
		const results = await Promise.all(
			splits.map(async ({ ticker }) =>
				limit(async () => {
					const dailys = (
						await this.stocksApi.getAllDailysByTicker(ticker)
					).map(mapIAggsSingleToTable)

					const staleResult = await this.stalenessChecker.check(ticker, dailys)
					if (staleResult.isErr()) {
						return staleResult
					}

					const allMatch = staleResult.value.every(
						({ match }) => match === true,
					)
					if (allMatch) {
						return ok(<SplitOk>{
							ticker,
							updated: false,
						})
					}

					const updateResults = await this.updateTicker(dailys, ticker)

					if (updateResults.isErr()) {
						return updateResults
					}

					return ok(<SplitOk>{
						ticker,
						updated: true,
					})
				}),
			),
		)
		return results
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

		if (count === 1)
			return ok(<UpdateOk>{
				updated: true,
				ticker,
				date: formatDateString(daily.date),
			})

		return err(<UpdateError>{
			ticker,
			date: formatDateString(daily.date),
			...(count > 1
				? {
						errorCode: 'UpdatedMoreThenOneEntryPerDay',
						updated: true,
				  }
				: {
						errorCode: 'UpdatedLessThenOneEntryPerDay',
						updated: false,
				  }),
		})
	}
}

type SplitOk = {
	ticker: string
	updated: boolean
}

type UpdateOk = {
	date: string
	ticker: string
	updated: true
}

type UpdateError = {
	date: string
	errorCode: 'UpdatedMoreThenOneEntryPerDay' | 'UpdatedLessThenOneEntryPerDay'
	updated: boolean
	ticker: string
}

const groupBy = <T>(arr: T[], keys: (keyof T)[]): { [key: string]: T[] } => {
	return arr.reduce(
		(storage, item) => {
			const objKey = keys.map(key => `${item[key]}`).join(':')
			if (storage[objKey]) {
				storage[objKey].push(item)
			} else {
				storage[objKey] = [item]
			}
			return storage
		},
		{} as { [key: string]: T[] },
	)
}
