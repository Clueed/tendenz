const UNITS = [
	{ unit: 'trillion', value: 1e12 },
	{ unit: 'billion', value: 1e9 },
	{ unit: 'million', value: 1e6 },
] as const

const bucketValues = [
	1,
	5,
	10,
	...Array.from({ length: 5 }, (_, i) => (i + 1) * 20),
	...Array.from({ length: 8 }, (_, i) => (i + 1) * 100 + 100),
] as const

export function getMarketCapCategory(marketCap: number) {
	const { unit, value: unitValue } =
		UNITS.find(({ value }) => marketCap >= value) || UNITS[2]

	const rounded = Math.round(marketCap / unitValue)

	const bucket = [...bucketValues].reverse().reduce((prev, curr) => {
		return Math.abs(curr - rounded) < Math.abs(prev - rounded) ? curr : prev
	})

	const formatted = `$${bucket}${unit.charAt(0)}`

	return { rounded, unit, bucket, formatted }
}
