import { dailySigmaRoutine } from '../dailyRoutine/dailySigmaRoutine.js'
import { supplementTickerDetails } from '../dailyRoutine/supplementTickerDetails.js'
import { PolygonRequestHandler } from '../lib/polygonApi/polygonRequestHandler.js'
import { PolygonStocksApi } from '../lib/polygonApi/polygonStocksApi.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const prisma = new PrismaClient()
const requestHandler = new PolygonRequestHandler(process.env.POLYGON_API_KEY2)
const stocksApi = new PolygonStocksApi(requestHandler)

await supplementTickerDetails()
await dailySigmaRoutine()
