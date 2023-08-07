import { AxiosError } from 'axios'
import { formatDateString } from '../../misc.js'
import {
	IAggsMultiple,
	IAggsResultsSingle,
	IAggsSingle,
	IStockSplits,
	ITickerDetails,
	ITickerDetailsResults,
} from './polygonTypes.js'
import { RequestHandler, StocksApi } from './stocksApi.js'

export class PolygonStocksApi implements StocksApi {
	requestHandler: RequestHandler

	constructor(requestHandler: RequestHandler) {
		this.requestHandler = requestHandler
	}

	async getMarketDay(date: string) {
		console.debug(`Requesting daily market data on ${date}`)

		try {
			const response = await this.requestHandler.get<IAggsMultiple>(
				`v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&include_otc=false`,
			)

			return response.data.results || []
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
	}

	async getAllDailysByTicker(ticker: string): Promise<IAggsResultsSingle[]> {
		console.debug(`Requesting daily aggs for ${ticker}`)
		const date = formatDateString(new Date())
		try {
			const response = await this.requestHandler.get<IAggsSingle>(
				`v2/aggs/ticker/${ticker}/range/1/day/2019-01-09/${date}?adjusted=true&sort=desc&limit=5000`,
			)
			return response.data.results || []
		} catch (e) {
			console.error(e)
			return []
		}
	}

	async getTickerDetails(
		date: string,
		ticker: string,
	): Promise<ITickerDetailsResults | undefined> {
		console.debug(`Requesting ticker details for ${ticker} on ${date}`)

		try {
			const response = await this.requestHandler.get<ITickerDetails>(
				`v3/reference/tickers/${ticker}?date=${date}`,
			)
			return response.data.results
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status === 403) {
					return undefined
				}
			}
			console.error(e)
			return undefined
		}
	}

	async getSplits(date: string) {
		console.debug(`Requesting splits data up to ${date}`)

		try {
			const response = await this.requestHandler.get<IStockSplits>(
				`https://api.polygon.io/v3/reference/splits?execution_date.lte=${date}reverse_split=true&order=desc&limit=1000`,
			)
			return response.data.results || []
		} catch (e) {
			console.error(e)
			return []
		}
	}
}
