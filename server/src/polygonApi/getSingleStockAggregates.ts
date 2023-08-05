import { polygon } from '../globals.js'
import { formatDateString } from '../misc.js'
import { IAggs, IAggsResults } from './polygonTypes.js'

export async function getSingleStockAggregates(
	ticker: string,
): Promise<IAggsResults[]> {
	const date = formatDateString(new Date())

	try {
		const response = await polygon.get(
			`v2/aggs/ticker/${ticker}/range/1/day/2019-01-09/${date}?adjusted=true&sort=desc&limit=5000`,
		)

		const data = response.data as IAggs

		return data.results || []
	} catch (e) {
		console.error(e)
		return []
	}
}
