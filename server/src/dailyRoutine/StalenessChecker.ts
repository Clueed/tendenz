import { UsStockDaily } from '@prisma/client'
import {
	SingleAggsMapping,
	formatDateString,
	getStartAndEndOfDay,
} from '../lib/misc.js'

export const staleResult = new Result<
	{ match: boolean; date: string },
	{ date: string; errorCode: 'MoreThenOneEntryForDate' | 'NoEntriesForDate' }
>()

const keysToCheck = {
	date: true,
	volume: true,
	open: true,
	close: true,
	high: true,
	low: true,
	volumeWeighted: true,
	nTransactions: true,
} as const

interface IDatabaseApi {
	getDailyInDateRange(
		ticker: string,
		startdate: Date,
		enddate: Date,
	): Promise<UsStockDaily[]>
}

export class StalenessChecker {
	constructor(private db: IDatabaseApi) {}

	async check(ticker: string, dailys: SingleAggsMapping[]) {
		const dailysToCheck = [
			dailys[0],
			dailys[Math.floor(dailys.length / 2)],
			dailys[dailys.length - 1],
		]

		return await Promise.all(
			dailysToCheck.map(async daily => await this.checkIfMatch(ticker, daily)),
		)
	}

	private async checkIfMatch(ticker: string, newDaily: SingleAggsMapping) {
		const date = new Date(newDaily.date)
		const { startOfDay, endOfDay } = getStartAndEndOfDay(date)
		const oldDailys = await this.db.getDailyInDateRange(
			ticker,
			startOfDay,
			endOfDay,
		)

		const entryCount = oldDailys.length
		if (entryCount !== 1) {
			return staleResult.failure({
				errorCode:
					entryCount > 1 ? 'MoreThenOneEntryForDate' : 'NoEntriesForDate',
				date: formatDateString(date),
			})
		}

		const oldDaily = oldDailys[0]

		for (const key of Object.keys(keysToCheck) as Array<
			keyof typeof keysToCheck
		>) {
			if (oldDaily[key] !== newDaily[key]) {
				return staleResult.success({
					match: false,
					date: formatDateString(date),
				})
			}
		}

		return staleResult.success({
			match: true,
			date: formatDateString(date),
		})
	}
}
