import { AxiosResponse } from 'axios'

import {
	IAggsResultsMultiple,
	IAggsResultsSingle,
	IStockSplitResults,
	ITickerDetailsResults,
} from './polygonTypes.js'

export interface RequestHandler {
	get<T>(url: string): Promise<AxiosResponse<T>>
}

export interface StocksApi {
	readonly requestHandler: RequestHandler

	getMarketDay(date: string): Promise<IAggsResultsMultiple[]>
	getAllDailysByTicker(ticker: string): Promise<IAggsResultsSingle[]>
	getTickerDetails(
		date: string,
		ticker: string,
	): Promise<ITickerDetailsResults | undefined>
	getSplits(date: string): Promise<IStockSplitResults[]>
}
