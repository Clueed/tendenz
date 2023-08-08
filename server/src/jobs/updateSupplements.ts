import { PrismaClient } from '@prisma/client'
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

try {
	await supplementTickerDetails(db, stocksApi)
} catch (e) {
	console.error(e)
}

await db.disconnect()
