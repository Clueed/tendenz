import { Prisma } from '@prisma/client'
import { formatDateString, getStartAndEndOfDay } from '../lib/misc.js'

const keys = {
	date: true,
	volume: true,
	open: true,
	close: true,
	high: true,
	low: true,
	volumeWeighted: true,
	nTransactions: true,
} as const

type UsStockDaily = Prisma.UsStockDailyGetPayload<{
	select: typeof keys
}>

interface IDatabaseApi {
	getDailyInDateRange(
		ticker: string,
		startdate: Date,
		enddate: Date,
	): Promise<UsStockDaily[]>
}

export class StalenessChecker {
	constructor(private db: IDatabaseApi) {}

	async check(ticker: string, dailys: UsStockDaily[]) {
		const dailysToCheck = [
			dailys[0],
			dailys[Math.floor(dailys.length / 2)],
			dailys[dailys.length - 1],
		]

		return await Promise.all(
			dailysToCheck.map(async daily => await this.checkIfMatch(ticker, daily)),
		)
	}

	private async checkIfMatch(
		ticker: string,
		newDaily: UsStockDaily,
	): Promise<StalenessCheckResult> {
		const date = new Date(newDaily.date)
		const { startOfDay, endOfDay } = getStartAndEndOfDay(date)
		const oldDailys = await this.db.getDailyInDateRange(
			ticker,
			startOfDay,
			endOfDay,
		)

		const entryCount = oldDailys.length
		if (entryCount !== 1) {
			return {
				success: false,
				errorCode:
					entryCount > 1 ? 'MoreThenOneEntryForDate' : 'NoEntriesForDate',
				date: formatDateString(date),
			}
		}

		const oldDaily = oldDailys[0]

		for (const key of Object.keys(keys) as Array<keyof typeof keys>) {
			if (oldDaily[key] !== newDaily[key]) {
				return {
					success: true,
					match: false,
					date: formatDateString(date),
				}
			}
		}

		return {
			success: true,
			match: true,
			date: formatDateString(date),
		}
	}
}

const StalenessCheckIsSuccess = (
	result: { success: true } | { success: false },
): result is StalenessCheckSuccess => result.success === true

const StalenessCheckIsFailed = (
	result: { success: true } | { success: false },
): result is StalenessCheckFailed => result.success === false

type SplitErrorCode = 'MoreThenOneEntryForDate' | 'NoEntriesForDate'

type StalenessCheckSuccess = {
	success: true
	match: boolean
	date: string
}

type StalenessCheckFailed = {
	success: false
	date: string
	errorCode: SplitErrorCode
}

type StalenessCheckResult = StalenessCheckSuccess | StalenessCheckFailed
