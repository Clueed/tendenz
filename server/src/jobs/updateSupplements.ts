import { dailySigmaRoutine } from '../dailyRoutine/dailySigmaRoutine.js'
import { supplementTickerDetails } from '../dailyRoutine/supplementTickerDetails.js'
import { PolygonRequestHandler } from '../lib/polygonApi/polygonRequestHandler.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const requestHandler = new PolygonRequestHandler(process.env.POLYGON_API_KEY2)

await supplementTickerDetails()
await dailySigmaRoutine()
