'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import * as Slider from '@radix-ui/react-slider'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext, MarketCapFilter } from '../FilterContextProvider'

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

const valueMapMax: Record<number, number> = {
	0: 0,
	1: 1e6,
	2: 10e6,
	3: 100e6,
	4: 500e6,
	5: 1e9,
	6: 10e9,
	7: 100e9,
	8: 500e9,
	9: Infinity,
}

export default function MarketCapFilter({}: {}) {
	const { marketCap, setMarketCap } = useContext(FilterContext)

	const [localMarketCap, setLocalMarketCap] =
		useState<MarketCapFilter>(marketCap)

	const {
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm<Inputs>({
		defaultValues: {
			textfield: {
				min: convertNumberToString(DEFAULT_MIN_MARKETCAP),
				max: convertNumberToString(Infinity),
			},
		},
	})

	const onSubmit: SubmitHandler<Inputs> = ({ textfield: { min, max } }) => {
		if (typeof min === 'string' && typeof max === 'string') {
			setLocalMarketCap({
				min: convertStringToNumber(min),
				max: convertStringToNumber(max),
			})
		} else {
			setLocalMarketCap({
				min: min as number,
				max: max as number,
			})
		}
	}

	useEffect(() => {
		const subscription = watch(() => handleSubmit(onSubmit)())
		return () => subscription.unsubscribe()
	}, [handleSubmit, watch])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const { min, max } = localMarketCap
			console.log('min :>> ', min)
			console.log('min :>> ', max)
			setMarketCap({
				min,
				max,
			})
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [localMarketCap, setMarketCap])

	const [edit, setEdit] = useState<boolean>(false)

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classNames(
					'w-52 rounded-lg transition-colors delay-150 duration-500 ease-in',
					edit
						? 'bg-slate-a8 px-4 py-2 text-sm text-slate-1'
						: 'px-2 py-1 text-xs text-slate-11',
				)}
			>
				<Controller
					control={control}
					name="textfield"
					render={({ field }) => (
						<>
							<div
								className={classNames(
									'group relative mb-2 flex justify-end text-right tracking-wide ',
								)}
							>
								{!edit && (
									<div
										className="absolute inset-0"
										onClick={() => setEdit(!edit)}
									/>
								)}
								<motion.div
									layout
									className={classNames(
										'flex items-center justify-end rounded-md transition-colors duration-500',
										edit
											? 'gap-2 pt-1 text-sm'
											: 'px-2 py-0 text-xs group-hover:bg-slate-a4 group-hover:text-slate-12',
									)}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
								>
									<div>$</div>
									<div
										className={classNames(edit ? 'h-full w-full' : 'h-5 w-10')}
									>
										<input
											value={field.value.min === 0 ? '' : field.value.min}
											onChange={e =>
												field.onChange({
													min: e.target.value,
													max: field.value.max,
												})
											}
											className={classNames(
												'inline h-full w-full appearance-none bg-[#00000000] text-center focus:outline-none',
												edit
													? 'rounded-md border-2 border-slate-7 focus:border-slate-2'
													: '',
											)}
										/>
									</div>
									<div>-</div>
									<div
										className={classNames(
											edit ? 'h-full w-full' : 'h-5 w-10',
											field.value.max === '∞' &&
												'text-xl font-light leading-none',
										)}
									>
										<input
											value={field.value.max === 0 ? '' : field.value.max}
											onChange={e =>
												field.onChange({
													max: e.target.value,
													min: field.value.min,
												})
											}
											className={classNames(
												'inline h-full w-full appearance-none bg-[#00000000] text-center focus:outline-none',
												edit
													? 'rounded-md border-2 border-slate-7 focus:border-slate-2'
													: '',
											)}
										/>
									</div>
								</motion.div>
							</div>
							<Slider.Root
								className="group/slider relative mt-1 flex h-4 touch-none select-none items-center"
								max={9}
								step={1}
								onValueChange={values => {
									const newMinValue = convertNumberToString(
										valueMap[Number(values[0])],
									)

									const newMaxValue = convertNumberToString(
										valueMapMax[Number(values[1])],
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

const sliderValue = (value: number | string) => {
	const newMin =
		typeof value === 'number' ? value : convertStringToNumber(value)

	return Number(
		Object.entries(valueMap)
			.reverse()
			.find(([_, value]) => value <= newMin)?.[0],
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
