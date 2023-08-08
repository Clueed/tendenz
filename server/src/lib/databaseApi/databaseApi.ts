import { Prisma, PrismaClient } from '@prisma/client'
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

	async getStocksWithoutMcOnGtDate(date: Date) {
		return await this.prisma.usStocks.findMany({
			where: {
				dailys: {
					none: {
						marketCap: { not: null },
						date: {
							gt: date,
						},
					},
				},
			},
			select: {
				ticker: true,
			},
		})
	}

	async getMostRecentDaily(ticker: string) {
		return await this.prisma.usStockDaily.findFirst({
			where: {
				ticker: ticker,
			},
			orderBy: { date: 'desc' },
		})
	}

	async updateDaily(
		ticker: string,
		date: Date,
		data: Prisma.UsStockDailyUpdateInput,
	) {
		return await this.prisma.usStockDaily.update({
			where: {
				ticker_date: {
					ticker,
					date,
				},
			},
			data,
		})
	}

	async getDailyInDateRange(ticker: string, startdate: Date, enddate: Date) {
		return await this.prisma.usStockDaily.findMany({
			where: {
				ticker,
				date: {
					gte: startdate,
					lte: enddate,
				},
			},
		})
	}

	async updateDailyInDateRange(
		ticker: string,
		startdate: Date,
		enddate: Date,
		data: Prisma.UsStockDailyUpdateInput,
	) {
		return await this.prisma.usStockDaily.updateMany({
			where: {
				ticker,
				date: {
					gte: startdate,
					lte: enddate,
				},
			},
			data,
		})
	}

	async updateStocks(ticker: string, data: Prisma.UsStocksUpdateInput) {
		return await this.prisma.usStocks.update({
			where: {
				ticker,
			},
			data,
		})
	}
}
