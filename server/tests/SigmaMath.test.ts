import { describe, expect, it } from '@jest/globals'
import {
	SigmaMath,
	getDailyStockReturn,
} from '../src/dailyRoutine/SigmaMath.js'

describe('SigmaMath - sortByDateDesc', () => {
	it('should sort data points by date in descending order', () => {
		const dataPoints: getDailyStockReturn[] = [
			{
				marketCap: 1000000,
				close: 50,
				date: new Date('2023-08-01'),
			},
			{
				marketCap: 1100000,
				close: 48,
				date: new Date('2023-08-03'),
			},
			{
				marketCap: 900000,
				close: 55,
				date: new Date('2023-08-02'),
			},
		]

		const sortedData = SigmaMath.sortByDate(dataPoints, 'desc')

		expect(sortedData).toEqual([
			{
				marketCap: 1100000,
				close: 48,
				date: new Date('2023-08-03'),
			},
			{
				marketCap: 900000,
				close: 55,
				date: new Date('2023-08-02'),
			},
			{
				marketCap: 1000000,
				close: 50,
				date: new Date('2023-08-01'),
			},
		])
	})

	it('should sort data points by date in ascending order', () => {
		const dataPoints: getDailyStockReturn[] = [
			{
				marketCap: 1100000,
				close: 48,
				date: new Date('2023-08-03'),
			},
			{
				marketCap: 1000000,
				close: 50,
				date: new Date('2023-08-01'),
			},
			{
				marketCap: 900000,
				close: 55,
				date: new Date('2023-08-02'),
			},
		]

		const sortedData = SigmaMath.sortByDate(dataPoints, 'asc')

		expect(sortedData).toEqual([
			{
				marketCap: 1000000,
				close: 50,
				date: new Date('2023-08-01'),
			},
			{
				marketCap: 900000,
				close: 55,
				date: new Date('2023-08-02'),
			},
			{
				marketCap: 1100000,
				close: 48,
				date: new Date('2023-08-03'),
			},
		])
	})

	it('should handle an empty array', () => {
		const emptyArray: getDailyStockReturn[] = []

		const sortedDataAsc = SigmaMath.sortByDate(emptyArray, 'desc')
		const sortedDataDesc = SigmaMath.sortByDate(emptyArray, 'asc')

		expect(sortedDataAsc).toEqual([])
		expect(sortedDataDesc).toEqual([])
	})
})
