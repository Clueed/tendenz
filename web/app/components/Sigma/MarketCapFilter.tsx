'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import * as Slider from '@radix-ui/react-slider'
import { useContext, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext } from '../FilterContextProvider'

type Inputs = {
	textfield: number | string
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

	const {
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm<Inputs>({
		defaultValues: {
			textfield: convertNumberToString(DEFAULT_MIN_MARKETCAP),
		},
	})
	const [localMinMarketCap, localSetMinMarketCap] =
		useState<number>(minMarketCap)

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
		if (typeof data.textfield === 'string') {
			localSetMinMarketCap(convertStringToNumber(data.textfield))
		} else {
			localSetMinMarketCap(data.textfield)
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
			console.log(localMinMarketCap)
			setMinMarketCap(localMinMarketCap)
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [localMinMarketCap, setMinMarketCap])

	const sliderValue = (value: number | string) => {
		const newValue =
			typeof value === 'number' ? value : convertStringToNumber(value)

		return Number(
			Object.entries(valueMap)
				.reverse()
				.find(([index, value]) => value <= newValue)?.[0],
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
									typeof field.value === 'string'
										? field.value
										: convertNumberToString(field.value)
								}
								value={field.value === 0 ? '' : field.value}
								onChange={e => field.onChange(e.target.value)}
							/>
							<Slider.Root
								className="relative flex h-5 w-full touch-none select-none items-center"
								max={9}
								step={1}
								onValueChange={v => {
									const newValue = valueMap[Number(v[0])]

									field.onChange(convertNumberToString(newValue))
								}}
								value={[sliderValue(field.value)]}
							>
								<Slider.Track className="relative h-[3px] grow rounded-full bg-slate-a5">
									<Slider.Range className="absolute h-full rounded-full bg-slate-a10" />
								</Slider.Track>
								<Slider.Thumb
									className="focus:shadow-blackA8 block h-4 w-4 rounded-[10px] bg-slate-11 hover:bg-violet-5 focus:shadow-[0_0_0_5px] focus:outline-none"
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

function convertNumberToString(value: number) {
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
