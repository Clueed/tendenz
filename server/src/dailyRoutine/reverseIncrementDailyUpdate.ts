import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'
import { StocksApi } from '../lib/polygonApi/stocksApi.js'
import { updateDaily as writeMarketDay } from './updateDaily.js'

export async function reverseIncrementDailyUpdate(
	db: DatabaseApi,
	stocksApi: StocksApi,
	endOnNoUpdates: boolean = true,
	startingDate: Date = new Date(),
): Promise<UpdateStatus[]> {
	const stats: UpdateStatus[] = []

	let daysPast: number = 0

	while (shouldContinue(stats, endOnNoUpdates)) {
		const targetDate = startingDate.getTime() - daysPast * 24 * 60 * 60 * 1000
		const dateString = formatDateString(targetDate)
		console.group(`Updating ${dateString}`)

		const results = await stocksApi.getMarketDay(dateString)
		let updateCount: number = 0
		if (results.length > 0) {
			updateCount = await writeMarketDay(db, results)
		} else {
			console.info('No data available.')
			updateCount = 0
		}

		stats.push({
			updated: updateCount,
			queryCount: results.length,
			date: dateString,
		})

		console.groupEnd()
		daysPast++
	}

	return stats
}

const shouldContinue = (stats: UpdateStatus[], endOnNoUpdates: boolean) => {
	const queryCounts = stats.reverse().map(day => day.queryCount)
	if (consecutiveZeros(queryCounts) > 6) {
		// API error or more than 2 years back
		return false
	}

	const updatedDays = stats.reverse().map(day => day.updated)
	if (endOnNoUpdates && consecutiveZeros(updatedDays) >= 5) {
		// covers weekend + holiday + buffer
		return false
	}

	return true
}

interface UpdateStatus {
	updated: number
	queryCount: number
	date: string
}

function consecutiveZeros(array: number[]) {
	let zeros = 0

	for (const i of array) {
		if (i === 0) {
			zeros++
		} else {
			break
		}
	}

	return zeros
}
