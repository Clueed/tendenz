import { PrismaClient } from '@prisma/client'

export class DatabaseApi {
	prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	async disconnect() {
		return await this.prisma.$disconnect()
	}

	async getTickersOnDate(input_date: number | Date): Promise<string[]> {
		let date: Date

		if (input_date instanceof Date) {
			date = input_date
		} else {
			date = new Date(input_date)
		}

		const allDailysAtDate = await this.prisma.usStockDaily.findMany({
			where: {
				date,
			},
		})

		return allDailysAtDate.map(daily => daily.ticker)
	}

	async writeDailyValues(dailyValues: {
		ticker: string
		date: Date
		volume: number
		open: number
		close: number
		high: number
		low: number
		volumeWeighted?: number | null
		nTransactions?: number | null
		marketCap?: number | null
	}) {
		const { ticker, ...day } = dailyValues
		await this.prisma.usStockDaily.create({
			data: {
				...day,
				UsStocks: {
					connectOrCreate: {
						where: { ticker: ticker },
						create: { ticker: ticker },
					},
				},
			},
		})
	}
}
