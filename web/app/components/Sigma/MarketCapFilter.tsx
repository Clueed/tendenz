'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import { Slider } from '@mui/base'
import {
	Dispatch,
	ReactElement,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext, MarketCapFilter } from '../FilterContextProvider'

const valueMap: Mapping[] = [
	{ slider: 0, number: 0 },
	{ slider: 1, number: 1e6 },
	{ slider: 2, number: 10e6 },
	{ slider: 3, number: 100e6 },
	{ slider: 4, number: 1e9 },
	{ slider: 5, number: 10e9 },
	{ slider: 6, number: 100e9 },
	{ slider: 7, number: 1000e9 },
]

const valueMapMax: Mapping[] = [
	{ slider: 0, number: 0 },
	{ slider: 1, number: 1e6 },
	{ slider: 2, number: 10e6 },
	{ slider: 3, number: 100e6 },
	{ slider: 4, number: 1e9 },
	{ slider: 5, number: 10e9 },
	{ slider: 6, number: 100e9 },
	{ slider: 7, number: Infinity },
]

const valueLength = valueMap.length - 1

type Mapping = { readonly slider: number; readonly number: number }

type Inputs = {
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

function sliderToValue<T extends Mapping[]>(
	inputValue: T[number]['slider'],
	map: T,
) {
	const slider = map.findLast(({ slider }) => slider === inputValue)?.number
	if (slider === undefined) {
		throw new Error('Slider mapping failed')
	}

	return slider
}

function valueToSlider<T extends Mapping[]>(
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
function createInputsFromSlider(
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
function createInputsFromValue(
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

function createInputsFromString(string: {
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

export default function MarketCapFilter({
	edit,
	setEdit,
}: {
	edit: boolean
	setEdit: Dispatch<SetStateAction<boolean>>
}) {
	const { marketCap, setMarketCap } = useContext(FilterContext)

	const [localMarketCap, setLocalMarketCap] =
		useState<MarketCapFilter>(marketCap)

	const {
		handleSubmit,
		watch,
		formState: { errors },
		control,
		setValue,
	} = useForm<Inputs>({
		defaultValues: {
			marketCapFilter: createInputsFromValue({
				min: DEFAULT_MIN_MARKETCAP,
				max: Infinity,
			}),
		},
	})

	const onSubmit: SubmitHandler<Inputs> = ({
		marketCapFilter: {
			number: { min, max },
		},
	}) => {
		setLocalMarketCap({
			min,
			max,
		})
	}

	useEffect(() => {
		const subscription = watch(() => handleSubmit(onSubmit)())
		return () => subscription.unsubscribe()
	}, [handleSubmit, watch])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const { min, max } = localMarketCap
			console.log('index :>> ', min, max)

			setMarketCap({
				min,
				max,
			})
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [localMarketCap, setMarketCap])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<Controller
				control={control}
				name="marketCapFilter"
				render={({
					field: { onChange: fieldOnChange, value: fieldValue, ...field },
				}) => (
					<Slider
						value={[fieldValue.slider.min, fieldValue.slider.max]}
						onChange={(event, value) => {
							const [min, max] = value as [number, number]
							const inputs = createInputsFromSlider({ min, max })
							fieldOnChange(inputs)
						}}
						{...field}
						step={1}
						marks
						min={0}
						max={valueLength}
						valueLabelFormat={(v, i) => {
							const min = i === 0
							return (
								<div>{min ? fieldValue.string.min : fieldValue.string.max}</div>
							)
						}}
						slots={{
							valueLabel: SliderValueLabel,
						}}
						slotProps={{
							thumb: {
								className:
									'w-2 h-2 flex items-center justify-center bg-slate-11 rounded-full shadow absolute -translate-x-1/2 -translate-y-1/4',
							},
							root: {
								className: 'w-full relative inline-block h-2 cursor-pointer',
							},
							rail: {
								className: 'bg-slate-a6 h-1 w-full rounded-full block absolute',
							},
							track: {
								className: 'bg-slate-9 h-1 absolute my-auto rounded-full',
							},
						}}
					/>
				)}
			/>
		</form>
	)
}

function SliderValueLabel({ children }: { children: ReactElement }) {
	return (
		<span className="-translate-y-5">
			<div className="value">{children}</div>
		</span>
	)
}

const unitConversions = [
	{ label: 'k', value: 1e3 },
	{ label: 'm', value: 1e6 },
	{ label: 'b', value: 1e9 },
	{ label: 't', value: 1e12 },
] as const

const matchString = (input: string) => {
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

function convertStringToNumber(input: string): number {
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

function convertNumberToString(number: number) {
	if (number === Infinity) return '∞'

	const unitConv = unitConversions.findLast(({ value }) => number >= value)

	if (unitConv) {
		return (number / unitConv.value).toFixed(0) + unitConv.label
	}

	return number.toString()
}
