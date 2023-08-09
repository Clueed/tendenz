import { Prisma } from '@prisma/client'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { IAggsResultsSingle } from '../lib/polygonApi/polygonTypes.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'

export class SplitDetector {
	private updateStatus: { ticker: string; updated: boolean }[] = []

	constructor(
		private db: DatabaseApi,
		private stocksApi: StocksApi,
		private stopAfterNUpdates: number = 10,
	) {}

	async run() {
		console.group(`Initiating split detector...`)
		const dates = formatDateString(new Date())
		const splits = await this.stocksApi.getSplits(dates)

		for (const { ticker, execution_date } of splits) {
			if (!this.cont()) {
				break
			}
			await this.handleSplit(ticker, execution_date)
		}
		console.info(`Detected and handled ${this.updateStatus.length} splits.`)
		console.groupEnd()
	}

	private async handleSplit(ticker: string, execution_date: string) {
		console.group(`Handling split for ${ticker} on ${execution_date}`)
		const dailys = await this.stocksApi.getAllDailysByTicker(ticker)

		const staleFirst = await this.checkValues(ticker, dailys[0])
		const staleLast = await this.checkValues(ticker, dailys[dailys.length - 1])

		if (!staleFirst && !staleLast) {
			this.updateStatus.push({ ticker, updated: false })
			console.debug(`${ticker} is already split-adjusted.`)
			console.groupEnd()
			return
		}

		for (const daily of dailys) {
			// no await here on purpose
			this.updateEntries(ticker, daily)
			this.updateStatus.push({ ticker, updated: true })
		}
		console.groupEnd()
	}

	private async updateEntries(ticker: string, daily: IAggsResultsSingle) {
		const { t, c, o, h, l, v, n, vw } = daily
		const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date(t))
		const updateData: Prisma.UsStockDailyUpdateInput = {
			volume: v,
			open: o,
			close: c,
			high: h,
			low: l,
			volumeWeighted: vw,
			nTransactions: n,
		}

		const { count } = await this.db.updateDailyInDateRange(
			ticker,
			startOfDay,
			endOfDay,
			updateData,
		)

		console.debug(`Updated entry on ${formatDateString(t)}`)
		if (count !== 1) {
			throw new Error(
				`${count} entries have been updated for ${ticker} on ${formatDateString(
					t,
				)}.`,
			)
		}
	}

	private async checkValues(
		ticker: string,
		newDaily: IAggsResultsSingle,
	): Promise<boolean> {
		const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date(newDaily.t))
		const oldDailys = await this.db.getDailyInDateRange(
			ticker,
			startOfDay,
			endOfDay,
		)

		if (oldDailys.length < 1) {
			console.warn(
				`${
					oldDailys.length
				} entries have been found for ${ticker} on ${formatDateString(
					newDaily.t,
				)}. Skipping...`,
			)
			return false
		}

		if (oldDailys.length > 1) {
			console.info(
				`${oldDailys.length} entries for ${ticker} on ${formatDateString(
					newDaily.t,
				)}. Updating all...`,
			)
			return true
		}

		const {
			volume: v,
			open: o,
			close: c,
			high: h,
			low: l,
			volumeWeighted: vw,
			nTransactions: n,
		} = oldDailys[0]

		const oldDaily = {
			v,
			o,
			c,
			h,
			l,
			vw,
			n,
		} as const

		for (const key of Object.keys(oldDaily) as Array<keyof typeof oldDaily>) {
			if (oldDaily[key] !== newDaily[key]) {
				return true
			}
		}
		return false
	}

	private cont(): boolean {
		const statuses = this.updateStatus.reverse()

		let consecutiveNoUpdates = 0

		for (const stat of statuses) {
			if (stat.updated === false) {
				consecutiveNoUpdates++
			} else {
				break
			}
		}

		if (consecutiveNoUpdates > this.stopAfterNUpdates) {
			return false
		}

		return true
	}
}
