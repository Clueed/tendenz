import { IAggsResultsMultiple } from '../lib/polygonApi/polygonTypes.js'

import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { formatDateString } from '../lib/misc.js'

export async function updateDaily(
	db: DatabaseApi,
	results: IAggsResultsMultiple[],
): Promise<number> {
	// picking frist because all dates are the same
	const allTickersAtDate = await db.getTickersOnDate(results[0].t)

	let counter: number = 0

	for (const result of results) {
		const {
			T: ticker,
			t: timestamp,
			v: volume,
			o: open,
			c: close,
			h: high,
			l: low,
			vw: volumeWeighted,
			n: nTransactions,
		} = result

		const date = new Date(timestamp)
		const dateString = formatDateString(date)

		if (allTickersAtDate.includes(ticker)) {
			console.debug(
				`Record already exists for ${ticker} on ${dateString}. Skipping...`,
			)
			continue
		}

		await db.writeDailyValues({
			date,
			volume,
			open,
			close,
			high,
			low,
			volumeWeighted,
			nTransactions,
			ticker,
		})

		console.debug(`Added ${ticker} on ${dateString} to db`)
		counter++
	}

	return counter
}
