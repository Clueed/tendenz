import { PrismaClient } from '@prisma/client'
import { dailySigmaRoutine } from '../dailyRoutine/dailySigmaRoutine.js'
import { reverseIncrementDailyUpdate } from '../dailyRoutine/reverseIncrementDailyUpdate.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

const prisma = new PrismaClient()

try {
	await reverseIncrementDailyUpdate()
	await dailySigmaRoutine()
} catch (e) {
	console.error(e)
}

await prisma.$disconnect()
