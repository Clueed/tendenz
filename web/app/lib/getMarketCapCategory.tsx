export function getMarketCapCategory(marketCap: number) {
	const UNITS = [
		{ unit: 'trillion', value: 1e12 },
		{ unit: 'billion', value: 1e9 },
		{ unit: 'million', value: 1e6 },
	]

	const bucketValues = [
		...Array.from({ length: 10 }, (_, i) => i + 1),
		...Array.from({ length: 4 }, (_, i) => (i + 1) * 25),
		...Array.from({ length: 8 }, (_, i) => (i + 1) * 100 + 100),
	]

	const { unit, value: unitValue } =
		UNITS.find(({ value }) => marketCap >= value) || UNITS[2]

	const rounded = Math.round(marketCap / unitValue)

	const bucket = bucketValues
		.reverse()
		.find(bucketValue => rounded >= bucketValue) as number

	const formatted = `$${bucket}${unit.charAt(0)}`

	return { rounded, unit, bucket, formatted }
}
