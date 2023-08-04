import { PrismaClient } from '@prisma/client'
import { dailySigmaRoutine } from '../dailyRoutine/dailySigmaRoutine.js'
import { reverseIncrementDailyUpdate } from '../dailyRoutine/reverseIncrementDailyUpdate.js'

if (process.env.NODE_ENV === 'production') {
	console.debug = function () {}
}

export const prisma = new PrismaClient()

await reverseIncrementDailyUpdate()
await dailySigmaRoutine()
