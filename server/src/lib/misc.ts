import { Prisma } from '@prisma/client'
import { IAggsResultsSingle } from './polygonApi/polygonTypes.js'

export function formatDateString(inputDate: Date | number): string {
	let date: Date

	if (inputDate instanceof Date) {
		date = inputDate
	} else {
		date = new Date(inputDate)
	}

	const yyyy = date.getFullYear()
	const mm = date.getMonth() + 1 // Months start at 0!
	const dd = date.getDate()

	let dateString = ' '
	if (mm < 10 && dd < 10) dateString = yyyy + '-0' + mm + '-0' + dd
	else if (mm < 10) dateString = yyyy + '-0' + mm + '-' + dd
	else if (dd < 10) dateString = yyyy + '-' + mm + '-0' + dd
	else dateString = yyyy + '-' + mm + '-' + dd

	return dateString
}

export function timeout(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function convertDateToUTC(date: Date): Date {
	return new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
	)
}

export function getStartAndEndOfDay(date: Date) {
	const startOfDay = new Date(date)
	startOfDay.setHours(0, 0, 0, 0)
	const endOfDay = new Date(date)
	endOfDay.setHours(23, 59, 59, 999)

	return { startOfDay, endOfDay }
}

export type SingleAggsMapping = Prisma.UsStockDailyGetPayload<{
	select: {
		date: true
		volume: true
		open: true
		close: true
		high: true
		low: true
		volumeWeighted: true
		nTransactions: true
	}
}>

export function mapIAggsSingleToTable(
	iAggs: IAggsResultsSingle,
): SingleAggsMapping {
	const {
		t: date,
		v: volume,
		o: open,
		c: close,
		h: high,
		l: low,
		vw: volumeWeighted,
		n: nTransactions,
	} = iAggs
	return {
		date: new Date(date),
		volume,
		open,
		close,
		high,
		low,
		volumeWeighted: volumeWeighted || null,
		nTransactions: nTransactions || null,
	}
}
