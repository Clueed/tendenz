import { Prisma } from '@prisma/client'
import { AssertionError } from 'assert'
import { DateTime } from 'luxon'
import { DatabaseApi } from '../lib/databaseApi/databaseApi.js'
import { SigmaMath } from './SigmaMath.js'

export class SigmaCalculator {
	constructor(private db: DatabaseApi) {}

	async run() {
		const mostRecentDate = await this.db.getMostRecentDate()
		const dailys = await this.db.getTickersWithNameOnDate(mostRecentDate)

		for (const { ticker, name } of dailys) {
			let sigmaRow: Prisma.SigmaUsStocksYesterdayCreateInput
			try {
				sigmaRow = await this.constructSigmaRow(ticker, name)
			} catch (e) {
				if (e instanceof AssertionError) {
					console.warn(e.message)
					continue
				} else {
					console.error(e)
					break
				}
			}
			this.db.createSigmaYesterday(sigmaRow)
		}
	}

	private async constructSigmaRow(
		ticker: string,
		name: string | undefined,
	): Promise<Prisma.SigmaUsStocksYesterdayCreateInput> {
		const now = DateTime.now()
		const earliestDate = now.minus({ year: 2 })
		const dailys = await this.db.getDailyInDateRange(
			ticker,
			now.toJSDate(),
			earliestDate.toJSDate(),
		)

		const minPopulation = 30
		if (dailys.length < minPopulation) {
			throw new Error(
				`${ticker} does not have enough data points (${dailys.length} < ${minPopulation}). Skipping...`,
			)
		}

		const mostRecentMarketCap = dailys.find(daily => daily.marketCap)?.marketCap

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
		}
	}
}
