import { Prisma, PrismaClient } from '@prisma/client'
import { stockTypeCode } from '@tendenz/types'
export class DatabaseApi {
	constructor(public prisma: PrismaClient) {}

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
		console.debug(
			`DB: updating ${ticker} in range of ${startdate} to ${enddate}`,
		)
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
		const daily = await this.prisma.usStockDaily.findFirstOrThrow({
			orderBy: {
				date: 'desc',
			},
			take: 1,
			select: {
				date: true,
			},
		})

		return daily.date
	}

	async createSigmaYesterday(data: Prisma.SigmaUsStocksYesterdayCreateInput) {
		return await this.prisma.sigmaUsStocksYesterday.create({
			data,
		})
	}

	/**
	 * Retrieves a list of daily stock data for a specific date where the marketCap value is null.
	 * Filters the data based on two conditions: either the weightedSharesOutstanding or the shareClassSharesOutstanding value is not null.
	 * Returns the ticker, close price, and date for each matching record.
	 *
	 * @param {Date} date - The specific date for which to retrieve the daily stock data.
	 * @returns {Array<Object>} - An array of objects representing the daily stock records. Each object contains the ticker (string), close price (number), and date (Date) properties.
	 */
	async getDailysForMarketCapCalc(date: Date) {
		return await this.prisma.usStockDaily.findMany({
			where: {
				date,
				marketCap: null,
				UsStocks: {
					OR: [
						{ weightedSharesOutstanding: { not: null } },
						{ shareClassSharesOutstanding: { not: null } },
					],
				},
			},
			select: {
				ticker: true,
				close: true,
				date: true,
			},
		})
	}

	async getTickerWithoutDetails() {
		return await this.prisma.usStocks.findMany({
			where: {
				OR: [
					{
						AND: {
							weightedSharesOutstanding: null,
							shareClassSharesOutstanding: null,
						},
					},
					{
						name: null,
					},
					{
						type: null,
					},
				],
			},
			select: {
				ticker: true,
			},
		})
	}

	async getTickersWithoutSigma(dates: Date[]) {
		// considere doing the check for wso and scso with market cap instead

		return this.prisma.usStocks.findMany({
			where: {
				AND: [
					{ dailys: { some: { date: dates[0], sigma: null } } },
					{ dailys: { some: { date: dates[1] } } },
				],
				OR: [
					{ weightedSharesOutstanding: { not: null } },
					{ shareClassSharesOutstanding: { not: null } },
				],
			},
		})
	}

	async getMostRecentDates(daysMinus: number = 1) {
		const dailys = await this.prisma.usStockDaily.groupBy({
			by: ['date'],
			orderBy: { date: 'desc' },
			take: daysMinus,
		})

		const dates = dailys.map(daily => daily.date)

		return dates
	}

	async getToday(
		page: number,
		date: Date,
		minMarketCap?: number,
		types?: stockTypeCode[] | undefined,
		pageSize: number = 10,
	) {
		const skip = page * pageSize
		const res = await this.prisma.usStockDaily.findMany({
			orderBy: {
				sigmaAbs: 'desc',
			},
			where: {
				marketCap: { gte: minMarketCap } || { not: null },
				date: date,
				UsStocks: {
					name: { not: null },
					type: { in: types, not: null },
				},
				sigmaAbs: { not: null },
			},
			take: pageSize,
			skip,
			select: {
				close: true,
				ticker: true,
				sigma: true,
				date: true,
				marketCap: true,
				UsStocks: {
					select: {
						name: true,
						type: true,
					},
				},
			},
		})

		res.forEach(daily => {
			const isNull = [
				daily.marketCap,
				daily.sigma,
				daily.UsStocks.name,
				daily.UsStocks.type,
			].some(v => v === null)
			if (isNull) {
				throw new Error(`${daily.ticker} has null values.`)
			}
		})

		return res as {
			ticker: string
			date: Date
			close: number
			marketCap: number
			sigma: number
			UsStocks: { name: string; type: stockTypeCode }
		}[]
	}
}
