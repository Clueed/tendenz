import { PrismaClient } from '@prisma/client'
import { dailySigmaRoutine } from '../dailyRoutine/dailySigmaRoutine.js'
import { reverseIncrementDailyUpdate } from '../dailyRoutine/reverseIncrementDailyUpdate.js'
import { PolygonRequestHandler } from '../lib/polygonApi/polygonRequestHandler.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const prisma = new PrismaClient()
const requestHandler = new PolygonRequestHandler(process.env.POLYGON_API_KEY1)

try {
	await reverseIncrementDailyUpdate()
	await dailySigmaRoutine()
} catch (e) {
	console.error(e)
}

await prisma.$disconnect()
