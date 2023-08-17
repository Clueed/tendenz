export function hoursUntilNextWeekdayHour(
	hour: number,
	currentDate = new Date(),
): number {
	const currentDay = currentDate.getUTCDay()

	let hoursRemaining = 0

	if (currentDay === 6) {
		hoursRemaining = hour - currentDate.getUTCHours() + 24 * 3
	} else if (currentDay === 7) {
		hoursRemaining = hour - currentDate.getUTCHours() + 24 * 2
	} else {
		hoursRemaining = hour - currentDate.getUTCHours() + 24
	}

	return hoursRemaining
}
