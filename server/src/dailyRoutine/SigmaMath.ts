export interface getDailyStockReturn {
	marketCap: number | null
	close: number
	date: Date
}

export interface LogReturns extends getDailyStockReturn {
	logReturn: number
}

export class SigmaMath {
	static calcSigma(population: number[], sample: number) {
		const n = population.length
		const mean = this.calculateMean(population)
		const stdev = this.calculateStandardDeviation(population, mean)
		const lastSigma = (sample - mean) / stdev
		return { sigma: lastSigma, stdev, mean, n }
	}

	private static calculateMean(data: number[]): number {
		const sum = data.reduce((a, b) => a + b, 0)
		return sum / data.length
	}

	private static calculateStandardDeviation(
		data: number[],
		mean: number,
	): number {
		const squaredDifferences = data.map(x => Math.pow(x - mean, 2))
		const sumOfSquaredDifferences = squaredDifferences.reduce(
			(a, b) => a + b,
			0,
		)
		return Math.sqrt(sumOfSquaredDifferences / data.length)
	}

	static calcLogReturnsAsc(
		sortedDataPoints: getDailyStockReturn[],
	): LogReturns[] {
		const dataPointsWithLogReturn: LogReturns[] = []

		for (let i = 1; i < sortedDataPoints.length; i++) {
			const curr = sortedDataPoints[i]
			const prev = sortedDataPoints[i - 1]
			const logReturn = Math.log(curr.close / prev.close)
			dataPointsWithLogReturn.push({
				...curr,
				logReturn,
			})
		}

		return dataPointsWithLogReturn
	}

	static sortByDate<T extends getDailyStockReturn>(
		dataPoints: T[],
		direction: 'asc' | 'desc',
	): T[] {
		return [...dataPoints].sort((a, b) => {
			return direction === 'asc'
				? a.date.getTime() - b.date.getTime()
				: b.date.getTime() - a.date.getTime()
		})
	}
}
