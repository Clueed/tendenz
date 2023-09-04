'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import * as Slider from '@radix-ui/react-slider'
import { useContext, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext } from '../FilterContextProvider'

type Inputs = {
	textfield: { min: number | string; max: number | string }
}

const valueMap: Record<number, number> = {
	0: 0,
	1: 1e6,
	2: 10e6,
	3: 100e6,
	4: 500e6,
	5: 1e9,
	6: 10e9,
	7: 100e9,
	8: 500e9,
	9: 1000e9,
}

export default function MarketCapFilter({}: {}) {
	const { minMarketCap, setMinMarketCap } = useContext(FilterContext)

	const [localMarketCap, setLocalMarketCap] = useState<{
		min: number
		max: number
	}>({
		min: minMarketCap,
		max: Infinity,
	})

	const {
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm<Inputs>({
		defaultValues: {
			textfield: {
				min: convertNumberToString(DEFAULT_MIN_MARKETCAP),
				max: Infinity,
			},
		},
	})
	const [localMinMarketCap, localSetMinMarketCap] =
		useState<number>(minMarketCap)

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
		if (typeof data.textfield.min === 'string') {
			localSetMinMarketCap(convertStringToNumber(data.textfield.min))
		} else {
			localSetMinMarketCap(data.textfield.min)
		}
	}

	useEffect(() => {
		// TypeScript users
		const subscription = watch(() => handleSubmit(onSubmit)())
		//const subscription = watch(handleSubmit(onSubmit))
		return () => subscription.unsubscribe()
	}, [handleSubmit, watch])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			console.log(localMarketCap.min)
			setMinMarketCap(localMarketCap.min)
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [localMarketCap.min, setMinMarketCap])

	const sliderValue = (value: number | string) => {
		const newMin =
			typeof value === 'number'
				? value
				: handleInfinityString(value, convertStringToNumber)

		return Number(
			Object.entries(valueMap)
				.reverse()
				.find(([_, value]) => value <= newMin)?.[0],
		)
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				${' '}
				<Controller
					control={control}
					name="textfield"
					render={({ field }) => (
						<>
							<input
								defaultValue={
									typeof field.value.min === 'string'
										? field.value.min
										: convertNumberToString(field.value.min)
								}
								value={field.value.min === 0 ? '' : field.value.min}
								onChange={e =>
									field.onChange({ min: e.target.value, max: field.value.max })
								}
								className="inline w-24 appearance-none bg-[#00000000] text-center tracking-wide focus:outline-none"
							/>
							-
							<input
								defaultValue={
									typeof field.value.max === 'string'
										? field.value.max
										: handleInfinityNumber(
												field.value.max,
												convertNumberToString,
										  )
								}
								value={field.value.max === 0 ? '' : field.value.max}
								onChange={e =>
									field.onChange({ max: e.target.value, min: field.value.min })
								}
								className="inline w-24 appearance-none bg-[#00000000] text-center tracking-wide focus:outline-none"
							/>
							<Slider.Root
								className="group/slider relative flex h-5 w-full touch-none select-none items-center"
								max={9}
								step={1}
								onValueChange={values => {
									const newMinValue = convertNumberToString(
										valueMap[Number(values[0])],
									)

									const newMaxValue = handleInfinityNumber(
										valueMap[Number(values[1])],
										convertNumberToString,
									)

									field.onChange({ min: newMinValue, max: newMaxValue })
								}}
								value={[
									sliderValue(field.value.min),
									sliderValue(field.value.max),
								]}
							>
								<Slider.Track className="relative h-1 grow rounded-full bg-slate-a6 transition-all duration-500 group-hover/slider:h-[6px] ">
									<Slider.Range className="absolute h-full rounded-full bg-slate-a8 group-hover/slider:bg-indigo-a8" />
								</Slider.Track>
								<Slider.Thumb
									className="block h-2 w-2 rounded-full bg-slate-11 transition-transform duration-500 hover:bg-slate-12 focus:outline-none group-hover/slider:scale-150 group-hover/slider:bg-indigo-11"
									aria-label="Volume"
								/>
								<Slider.Thumb
									className="block h-2 w-2 rounded-full bg-slate-11 transition-transform duration-500 hover:bg-slate-12 focus:outline-none group-hover/slider:scale-150 group-hover/slider:bg-indigo-11"
									aria-label="Volume"
								/>
							</Slider.Root>
						</>
					)}
				/>
			</form>
		</div>
	)
}

const handleInfinityNumber = (value: number, fn: (value: number) => string) => {
	if (value === Infinity) return '∞'
	return fn(value)
}

const handleInfinityString = (value: string, fn: (value: string) => number) => {
	if (value === '∞') return Infinity
	return fn(value)
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

function convertNumberToString(value: number, infinity: boolean = false) {
	if (infinity && value === Infinity) return '∞'

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
