export const valueMap: Mapping[] = [
	{ slider: 0, number: 0 },
	{ slider: 1, number: 1e6 },
	{ slider: 2, number: 10e6 },
	{ slider: 3, number: 100e6 },
	{ slider: 4, number: 1e9 },
	{ slider: 5, number: 10e9 },
	{ slider: 6, number: 100e9 },
	{ slider: 7, number: 1000e9 },
]

export const valueMapMax: Mapping[] = [
	{ slider: 0, number: 0 },
	{ slider: 1, number: 1e6 },
	{ slider: 2, number: 10e6 },
	{ slider: 3, number: 100e6 },
	{ slider: 4, number: 1e9 },
	{ slider: 5, number: 10e9 },
	{ slider: 6, number: 100e9 },
	{ slider: 7, number: Infinity },
]

export const valueLength = valueMap.length - 1

export type Mapping = { readonly slider: number; readonly number: number }

export type Inputs = {
	marketCapFilter: {
		slider: {
			min: (typeof valueMap)[number]['slider']
			max: (typeof valueMap)[number]['slider']
		}
		string: {
			min: string | null
			max: string | null
		}
		number: {
			min: number
			max: number
		}
	}
}

export function sliderToValue<T extends Mapping[]>(
	inputValue: T[number]['slider'],
	map: T,
) {
	const slider = map.findLast(({ slider }) => slider === inputValue)?.number
	if (slider === undefined) {
		throw new Error('Slider mapping failed')
	}

	return slider
}

export function valueToSlider<T extends Mapping[]>(
	inputValue: T[number]['number'],
	map: T,
) {
	const number = [...map].reverse().find(({ number }) => number <= inputValue)
		?.slider

	if (number === undefined) {
		throw new Error('Slider mapping failed')
	}

	return number
}
export function createInputsFromSlider(
	slider: Inputs['marketCapFilter']['slider'],
): Inputs['marketCapFilter'] {
	const number = {
		min: sliderToValue(slider.min, valueMap),
		max: sliderToValue(slider.max, valueMapMax),
	}

	const string = {
		min: convertNumberToString(number.min),
		max: convertNumberToString(number.max),
	}

	return {
		slider,
		number,
		string,
	}
}
export function createInputsFromValue(
	number: Inputs['marketCapFilter']['number'],
): Inputs['marketCapFilter'] {
	const slider = {
		min: valueToSlider(number.min, valueMap),
		max: valueToSlider(number.max, valueMapMax),
	}

	const string = {
		min: convertNumberToString(number.min),
		max: convertNumberToString(number.max),
	}

	return {
		slider,
		number,
		string,
	}
}

export function createInputsFromString(string: {
	min: string
	max: string
}): Inputs['marketCapFilter'] {
	const number = {
		min: convertStringToNumber(string.min),
		max: convertStringToNumber(string.max),
	}

	const slider = {
		min: valueToSlider(number.min, valueMap),
		max: valueToSlider(number.max, valueMapMax),
	}

	return {
		slider,
		number,
		string,
	}
}

export const nextToEachOther = (fieldValue: Inputs['marketCapFilter']) => {
	const { min, max } = fieldValue.slider
	if (max - min === 1) return true
	return false
}

export const unitConversions = [
	{ label: 'k', value: 1e3 },
	{ label: 'm', value: 1e6 },
	{ label: 'b', value: 1e9 },
	{ label: 't', value: 1e12 },
] as const

export const matchString = (input: string) => {
	const units = unitConversions.flatMap(({ label }) => [
		label.toLowerCase(),
		label.toUpperCase(),
	])

	const unitsString = units.join()

	const numberPattern = '/^(d+(.d+)?)s*([' + unitsString + '])?$/'
	const match = input.trim().match(numberPattern)

	if (!match) {
		return {
			value: null,
			unit: null,
		}
	}

	return {
		value: parseFloat(match[1]),
		unit: match[3].toLocaleLowerCase() as (typeof unitConversions)[number]['label'],
	}
}

export function convertStringToNumber(input: string): number {
	if (input === '∞') return Infinity
	const { unit, value } = matchString(input)
	if (unit && value) {
		const unitValue = unitConversions.findLast(
			({ label }) => label === unit,
		)!.value
		console.log('unitValue :>> ', unitValue)
		return value * unitValue
	}
	return Number(input)
}

export function convertNumberToString(number: number) {
	if (number === Infinity) return '∞'

	const unitConv = unitConversions.findLast(({ value }) => number >= value)

	if (unitConv) {
		return (number / unitConv.value).toFixed(0) + unitConv.label
	}

	return number.toString()
}
