import { Prisma, PrismaClient } from '@prisma/client'
export class DatabaseApi {
	constructor(private prisma: PrismaClient) {}

	async disconnect() {
		return await this.prisma.$disconnect()
	}

	async clearSigma() {
		await this.prisma.sigmaUsStocksYesterday.deleteMany({})
	}

	private async getAllDailysOnDate(
		input_date: number | Date,
		select: Prisma.UsStockDailySelect,
	) {
		let date: Date

		if (input_date instanceof Date) {
			date = input_date
		} else {
			date = new Date(input_date)
		}

		const dailys = await this.prisma.usStockDaily.findMany({
			where: {
				date,
			},
			select,
		})

		if (!dailys) {
			return []
		}

		return dailys
	}

	async getTickersOnDate(input_date: number | Date): Promise<string[]> {
		const dailys = await this.getAllDailysOnDate(input_date, { ticker: true })

		return dailys.map(daily => daily.ticker as string)
	}

	async getTickersWithNameOnDate(
		input_date: number | Date,
	): Promise<{ ticker: string; name: string | undefined }[]> {
		const dailys = await this.getAllDailysOnDate(input_date, {
			ticker: true,
			UsStocks: { select: { name: true } },
		})

		return dailys.map(daily => {
			return {
				ticker: daily.ticker as string,
				name: daily.UsStocks?.name as string | undefined,
			}
		})
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

	async getMostRecentDate() {
		const daily = await this.prisma.usStockDaily.findFirst({
			orderBy: {
				date: 'desc',
			},
			take: 1,
			select: {
				date: true,
			},
		})

		if (!daily) {
			throw new Error('Database empty or inaccessible')
		}

		return daily.date
	}

	async createSigmaYesterday(data: Prisma.SigmaUsStocksYesterdayCreateInput) {
		return await this.prisma.sigmaUsStocksYesterday.create({
			data,
		})
	}
}
