import { AxiosError, AxiosResponse } from 'axios'
import { polygon } from '../globals.js'
import { IAggsResults } from './polygonTypes.js'

/**
 * Retrieves aggregated daily market data for a specific date.
 *
 * @param {string} date - The date for which to retrieve the data in the format "YYYY-MM-DD".
 * @return {Promise<IAggsResults[]>} - A promise that resolves to an array of aggregated results or false if an error occurred.
 */
export async function aggregatesGroupedDaily(
	date: string,
): Promise<IAggsResults[]> {
	console.debug(`Requesting daily market data`)

	let response: AxiosResponse

	try {
		response = await polygon.get(
			`v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&include_otc=false`,
		)
	} catch (e) {
		if (e instanceof AxiosError) {
			if (e.response?.status === 403) {
				// Trading hasn't ended (probably todays date)
				return []
			}
		}
		console.error(e)
		return []
	}

	if (response.data.queryCount === 0 && response.data.resultsCount === 0) {
		// Good request but not a trading day (weekend etc.)
		return []
	}

	return response.data.results as IAggsResults[]
}
