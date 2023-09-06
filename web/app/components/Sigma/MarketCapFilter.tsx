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

	const onSubmit: SubmitHandler<Inputs> = (
		//{marketCapFilter: {number: {max, max}}}
		data,
	) => {
		console.log('data :>> ', data)
		return
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
				}) => {
					console.log('fieldValue :>> ', fieldValue)
					console.log('fieldValue.slider :>> ', fieldValue.slider)
					return (
						<Slider
							value={[fieldValue.slider.min, fieldValue.slider.max]}
							onChange={(event, value) => {
								const [min, max] = value as [number, number]
								const inputs = createInputsFromSlider({ min, max })
								console.log('inputs :>> ', inputs)
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
									<div>
										{min ? fieldValue.string.min : fieldValue.string.max}
									</div>
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
									className:
										'bg-slate-a6 h-1 w-full rounded-full block absolute',
								},
								track: {
									className: 'bg-slate-9 h-1 absolute my-auto rounded-full',
								},
							}}
						/>
					)
				}}
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

const matchString = (input: string) => {
	const numberPattern = /^(\d+(\.\d+)?)\s*([kKmMbBtT])?$/
	const match = input.trim().match(numberPattern)

	if (!match) {
		return { match: false }
	}

	return { match: true, value: parseFloat(match[1]), unit: match[3] }
}

function convertStringToNumber(input: string): number {
	if (input === '∞') return Infinity
	const { match, unit, value } = matchString(input)
	if (unit && value) {
		switch (unit.toLowerCase()) {
			case 'k':
				return value * 1e3
			case 'm':
				return value * 1e6
			case 'b':
				return value * 1e9
			case 't':
				return value * 1e12
		}
		return value
	}

	return Number(input)
}

function convertNumberToString(value: number) {
	if (value === Infinity) return '∞'

	if (value >= 1e12) {
		return (value / 1e12).toFixed(0) + 't'
	} else if (value >= 1e9) {
		return (value / 1e9).toFixed(0) + 'b'
	} else if (value >= 1e6) {
		return (value / 1e6).toFixed(0) + 'm'
	} else if (value >= 1e3) {
		return (value / 1e3).toFixed(0) + 'k'
	} else {
		return value.toString()
	}
}
