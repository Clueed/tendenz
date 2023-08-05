import { polygon } from '../globals.js'
import { formatDateString } from '../misc.js'

export interface IStockSplit {
	execution_date?: string
	split_from: number
	split_to: number
	ticker?: string
}

export interface IStockSplitsResults {
	next_url?: string
	request_id?: string
	results?: IStockSplit[]
	status?: string
}

export async function getRecentSplits(): Promise<IStockSplit[]> {
	const date = formatDateString(new Date())
	console.debug(`Requesting splits data on ${date}`)

	try {
		const response = await polygon.get(
			`https://api.polygon.io/v3/reference/splits?execution_date.lte=${date}reverse_split=true&order=desc&limit=1000`,
		)
		const data = response.data as IStockSplitsResults
		return data.results || []
	} catch (e) {
		console.error(e)
		return []
	}
}
