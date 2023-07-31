export function npl(date: string) {
	const delta = getDaysDifferenceFromNow(date)

	if (delta == 1) {
		return 'yesterday'
	} else {
		return new Date(Date.parse(date))
			.toLocaleString('en-us', { weekday: 'long' })
			.toLowerCase()
	}
}

function getDaysDifferenceFromNow(dateString: string): number {
	const targetDate = new Date(dateString)
	targetDate.setHours(0, 0, 0, 0)

	const currentDate = new Date()
	currentDate.setHours(0, 0, 0, 0)

	const timeDifference = targetDate.getTime() - currentDate.getTime()

	return Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
}
