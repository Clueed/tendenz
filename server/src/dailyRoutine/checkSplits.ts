import { PrismaClient } from '@prisma/client'
import { formatDateString } from '../lib/misc.js'
import { getRecentSplits } from '../lib/polygonApi/getSplits.js'

export async function checkSplits(prisma: PrismaClient) {
	const today = new Date()
	const todayString = formatDateString(today)
	console.group(`Checking for splits on ${todayString}`)
	const recentSplits = await getRecentSplits()
}
