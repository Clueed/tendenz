import { PrismaClient } from '@prisma/client'
import { DetailsSupplementer } from '../dailyRoutine/DetailsSupplementer.js'
import { MarketCapCalculator } from '../dailyRoutine/MarketCapCalculator.js'
import { supplementTickerDetails } from '../dailyRoutine/supplementTickerDetails.js'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { PolygonRequestHandler } from '../lib/polygonApi/polygonRequestHandler.js'
import { PolygonStocksApi } from '../lib/polygonApi/polygonStocksApi.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const db = new DatabaseApi(new PrismaClient())
const apiKey = process.env.POLYGON_API_KEY2

if (!apiKey) {
	throw Error('No API KEY')
}

const requestHandler = new PolygonRequestHandler(apiKey)
const stocksApi = new PolygonStocksApi(requestHandler)
const detailsSupplementer = new DetailsSupplementer(db, stocksApi)
const marketCapCalculator = new MarketCapCalculator(db)

try {
	await supplementTickerDetails(db, stocksApi)
	await detailsSupplementer.run()
	await marketCapCalculator.run()
} catch (e) {
	console.error(e)
	process.exit(1)
}

await db.disconnect()
process.exit(0)
