import { describe, expect, it } from '@jest/globals'
import { SigmaCalculator } from '../dailyRoutine/SigmaCalculator.js'

describe('SigmaCalculator', () => {
	describe('calculate', () => {
		it('should calculate sigma, stdev, mean, lastLogReturn, and secondLastLogReturn correctly for a valid input', () => {
			// this can be unsorted
			const dataPoints = [
				{ close: 159.23, date: new Date('Fri Aug 13 2021 22:00:00 GMT+0200') },
				{ close: 160.91, date: new Date('Tue Aug 17 2021 22:00:00 GMT+0200') },
				{ close: 173.59, date: new Date('Thu Aug 26 2021 22:00:00 GMT+0200') },
				{ close: 163.02, date: new Date('Wed Aug 18 2021 22:00:00 GMT+0200') },
				{ close: 168.13, date: new Date('Fri Aug 20 2021 22:00:00 GMT+0200') },
				{ close: 162.07, date: new Date('Mon Aug 16 2021 22:00:00 GMT+0200') },
				{ close: 170.57, date: new Date('Tue Aug 24 2021 22:00:00 GMT+0200') },
				{ close: 170, date: new Date('Mon Aug 23 2021 22:00:00 GMT+0200') },
				{ close: 167.67, date: new Date('Thu Aug 19 2021 22:00:00 GMT+0200') },
				{ close: 173.3, date: new Date('Wed Aug 25 2021 22:00:00 GMT+0200') },
			]

			const result = SigmaCalculator.calculate(dataPoints)
			expect(result.sigma).toBeCloseTo(-0.8793205529013357)
		})
	})
})
