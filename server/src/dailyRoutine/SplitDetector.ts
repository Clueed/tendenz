import { Prisma } from '@prisma/client'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString, getStartAndEndOfDay } from '../lib/misc.js'
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
		try {
			const dates = formatDateString(new Date())
			const splits = await this.stocksApi.getSplits(dates)

			for (const { ticker, execution_date } of splits) {
				if (this.cont()) {
					await this.handleSplit(ticker, execution_date)
				}
			}
			const detected = this.updateStatus.length
			const updated = this.updateStatus.filter(
				({ updated }) => updated === true,
			)
			console.info(
				`Detected ${detected} splits and adjusted data for ${updated.length}.`,
			)
		} catch (error) {
			console.error(
				`An error occurred while running the split detector: ${error}`,
			)
		}
		console.groupEnd()
	}

	private async handleSplit(ticker: string, execution_date: string) {
		console.group(`Handling split for ${ticker} on ${execution_date}`)
		const dailys = await this.stocksApi.getAllDailysByTicker(ticker)

		const firstMatches = await this.checkIfMatch(ticker, dailys[0])
		const lastMatches = await this.checkIfMatch(
			ticker,
			dailys[dailys.length - 1],
		)

		if (firstMatches && lastMatches) {
			this.updateStatus.push({ ticker, updated: false })
			console.debug(`${ticker} is already split-adjusted.`)
			console.groupEnd()
			return
		}

		await Promise.all(
			dailys.map(async daily => {
				await this.updateEntries(ticker, daily)
				this.updateStatus.push({ ticker, updated: true })
			}),
		)
		console.groupEnd()
	}

	private async updateEntries(
		ticker: string,
		daily: IAggsResultsSingle,
	): Promise<void> {
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
		if (count > 1) {
			throw new Error(
				`${count} entries have been updated for ${ticker} on ${formatDateString(
					t,
				)}.`,
			)
		}
	}

	private async checkIfMatch(
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
				return false
			}
		}
		return true
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
