import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import 'dotenv/config'
import { SigmaCalculator } from '../dailyRoutine/SigmaCalculator.js'
import { SplitDetector } from '../dailyRoutine/SplitDetector.js'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { PolygonRequestHandler } from '../lib/polygonApi/polygonRequestHandler.js'
import { PolygonStocksApi } from '../lib/polygonApi/polygonStocksApi.js'

dotenv.config()

console.log('process.env :>> ', process.env)

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const db = new DatabaseApi(new PrismaClient())
const apiKey = process.env.POLYGON_API_KEY1

if (!apiKey) {
	throw Error('No API KEY')
}

const requestHandler = new PolygonRequestHandler(apiKey)
const stocksApi = new PolygonStocksApi(requestHandler)
const splitDetector = new SplitDetector(db, stocksApi)
const sigmaCalculator = new SigmaCalculator(db)

try {
	//await reverseIncrementDailyUpdate(db, stocksApi)
	await splitDetector.run()
	await db.clearSigma()
	await sigmaCalculator.run()
} catch (e) {
	console.error(e)
}

await db.disconnect()
