import { handleUsStocksDailyRequest } from './handleUsStocksDailyRequest.js'
import { constructUsStocksDailyRoute } from './usStocksDaily.js'

export const usStocksDailyRoute = constructUsStocksDailyRoute(
	handleUsStocksDailyRequest,
)
