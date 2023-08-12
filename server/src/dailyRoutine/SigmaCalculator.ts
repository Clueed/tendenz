import { Prisma } from '@prisma/client'
import { DateTime } from 'luxon'
import { match } from 'ts-pattern'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { SigmaMath } from './SigmaMath.js'

export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		const mostRecentDate = await this.db.getMostRecentDate()
		const dailys = await this.db.getTickersWithNameOnDate(mostRecentDate)

		for (const { ticker, name } of dailys) {
			const result = await this.constructSigmaRow(ticker, name)

			match(result)
				.with({ success: true }, ({ data: sigmaRow }) =>
					this.db.createSigmaYesterday(sigmaRow),
				)
				.with({ success: false }, ({ errorCode }) =>
					console.log('errorCode :>> ', errorCode),
				)
				.exhaustive()
		}
	}

	private async constructSigmaRow(
		ticker: string,
		name: string | undefined,
	): Promise<
		| { success: false; errorCode: 'NotEnoughDataPoints' | 'NoMarketCap' }
		| { success: true; data: Prisma.SigmaUsStocksYesterdayCreateInput }
	> {
		const now = DateTime.now()
		const earliestDate = now.minus({ year: 2 })
		const dailys = await this.db.getDailyInDateRange(
			ticker,
			earliestDate.toJSDate(),
			now.toJSDate(),
		)

		const minPopulation = 30
		if (dailys.length < minPopulation) {
			return { success: false, errorCode: 'NotEnoughDataPoints' }
		}

		const mostRecentMarketCap = dailys.find(daily => daily.marketCap)?.marketCap
		if (!mostRecentMarketCap) {
			return { success: false, errorCode: 'NoMarketCap' }
		}

		const sortedDailys = SigmaMath.sortByDate(dailys, 'asc')
		const LogReturns = SigmaMath.calcLogReturnsAsc(sortedDailys)

		const sortedLogReturns = SigmaMath.sortByDate(LogReturns, 'desc')
		const [lastLogReturn, secondLastLogReturn, ...logReturnPopulation] =
			sortedLogReturns

		const { sigma, n, stdev, mean } = SigmaMath.calcSigma(
			logReturnPopulation.map(r => r.logReturn),
			lastLogReturn.logReturn,
		)

		return {
			success: true,
			data: {
				ticker,
				name,
				sigma,
				absSigma: Math.abs(sigma),
				stdLogReturn: stdev,
				meanLogReturn: mean,
				sampleSize: n,
				weight: 0,
				lastLogReturn: lastLogReturn.logReturn,
				lastClose: lastLogReturn.close,
				lastDate: lastLogReturn.date,
				secondLastLogReturn: secondLastLogReturn.logReturn,
				secondLastClose: secondLastLogReturn.close,
				secondLastDate: secondLastLogReturn.date,
				marketCap: mostRecentMarketCap,
			},
		}
	}
}
