import { IAggsResults } from '../polygonApi/aggregatesGroupedDaily.js'
import { allDailysOnDate, formatDateString } from '../misc.js'
import { prisma } from '../globals.js'

export async function updateDaily(results: IAggsResults[]): Promise<number> {
	// picking frist because all dates are the same
	const allTickersAtDate = await allDailysOnDate(results[0].t)

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

		await prisma.usStockDaily.create({
			data: {
				date,
				volume,
				open,
				close,
				high,
				low,
				volumeWeighted,
				nTransactions,
				UsStocks: {
					connectOrCreate: {
						where: { ticker: ticker },
						create: { ticker: ticker },
					},
				},
			},
		})

		console.debug(`Added ${ticker} on ${dateString} to db`)
		counter++
	}

	return counter
}
