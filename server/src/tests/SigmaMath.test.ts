import { describe, expect, it } from '@jest/globals'
import { DataPoints, SigmaMath } from '../dailyRoutine/SigmaMath.js'

describe('SigmaMath', () => {
	describe('sortByDateDesc', () => {
		it('should sort data points by date in descending order', () => {
			const dataPoints: DataPoints[] = [
				{
					close: 50,
					date: new Date('2023-08-01'),
				},
				{
					close: 48,
					date: new Date('2023-08-03'),
				},
				{
					close: 55,
					date: new Date('2023-08-02'),
				},
			]

			const sortedData = SigmaMath.sortByDate(dataPoints, 'desc')

			expect(sortedData).toEqual([
				{
					close: 48,
					date: new Date('2023-08-03'),
				},
				{
					close: 55,
					date: new Date('2023-08-02'),
				},
				{
					close: 50,
					date: new Date('2023-08-01'),
				},
			])
		})

		it('should sort data points by date in ascending order', () => {
			const dataPoints: DataPoints[] = [
				{
					close: 48,
					date: new Date('2023-08-03'),
				},
				{
					close: 50,
					date: new Date('2023-08-01'),
				},
				{
					close: 55,
					date: new Date('2023-08-02'),
				},
			]

			const sortedData = SigmaMath.sortByDate(dataPoints, 'asc')

			expect(sortedData).toEqual([
				{
					close: 50,
					date: new Date('2023-08-01'),
				},
				{
					close: 55,
					date: new Date('2023-08-02'),
				},
				{
					close: 48,
					date: new Date('2023-08-03'),
				},
			])
		})

		it('should handle an empty array', () => {
			const emptyArray: DataPoints[] = []

			const sortedDataAsc = SigmaMath.sortByDate(emptyArray, 'desc')
			const sortedDataDesc = SigmaMath.sortByDate(emptyArray, 'asc')

			expect(sortedDataAsc).toEqual([])
			expect(sortedDataDesc).toEqual([])
		})
	})

	describe('calcLogReturnsAsc', () => {
		it('calculates log returns correctly', () => {
			const dataPoints = [
				{ close: 10, date: new Date('2023-08-01') },
				{ close: 12, date: new Date('2023-08-02') },
				{ close: 11, date: new Date('2023-08-03') },
			]

			const expectedLogReturns = [
				{
					close: 12,
					date: new Date('2023-08-02'),
					logReturn: Math.log(12 / 10),
				},
				{
					close: 11,
					date: new Date('2023-08-03'),
					logReturn: Math.log(11 / 12),
				},
			]

			const logReturns = SigmaMath.calcLogReturnsAsc(dataPoints)

			expect(logReturns).toEqual(expectedLogReturns)
		})
	})

	describe('calcSigma', () => {
		it('calculates sigma given a population and a sample', () => {
			const population = [10, 20, 30, 40, 50]
			const sample = 25
			const result = SigmaMath.calcSigma(population, sample)

			const expected = {
				sigma: -0.35355339059327373,
				stdev: 14.142135623730951,
				mean: 30,
				n: 5,
			}

			expect(result.mean).toEqual(expected.mean)
			expect(result.n).toEqual(expected.n)
			expect(result.sigma).toBeCloseTo(expected.sigma)
			expect(result.stdev).toBeCloseTo(expected.stdev)
		})
	})
})
