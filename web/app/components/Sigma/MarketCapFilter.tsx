'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import { Slider } from '@mui/base'
import classNames from 'classnames'
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

type Inputs = {
	textfield: { min: number | string; max: number | string }
}

const zeroToZero = (x: number) => (x === 0 ? 0 : x)

const sliderToValue = (x: number) =>
	customMapping.find(({ slider }) => slider === x)?.value ||
	1e6 * Math.pow(10, x)
const valueToSlider = (y: number, mapping?: Mapping[]) =>
	customMapping.find(({ value }) => value === y)?.slider ||
	Math.log10(y / 1e6) / Math.log10(10)

const customMapping = [
	{ slider: 0, value: 0 },
	{ slider: 9, value: Infinity },
]
type Mapping = { slider: number; value: number }

const valueMapping = [
	{ slider: 0, value: 0 },
	{ slider: 1, value: 1e6 },
	{ slider: 2, value: 10e6 },
	{ slider: 3, value: 100e6 },
	{ slider: 4, value: 500e6 },
	{ slider: 5, value: 1e9 },
	{ slider: 6, value: 10e9 },
	{ slider: 7, value: 100e9 },
	{ slider: 8, value: 500e9 },
	{ slider: 9, value: 1000e9 },
]

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
			textfield: {
				min: convertNumberToString(DEFAULT_MIN_MARKETCAP),
				max: convertNumberToString(Infinity),
			},
		},
	})

	const [nextToEachOther, setNextToEachOther] = useState<boolean>(false)

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
			console.log('index :>> ')

			setMarketCap({
				min,
				max,
			})
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [localMarketCap, setMarketCap, setValue])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<Controller
				control={control}
				name="textfield"
				render={({ field: { value, onChange, ...field } }) => (
					<>
						{/* <div
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
											: 'bg-slate-a3 px-2 py-0 text-xs group-hover:bg-slate-a4 group-hover:text-slate-12',
									)}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
								>
									<div>$</div>
									<div
										className={classNames(edit ? 'h-full w-full' : 'h-5 w-10')}
									>
										<input
											value={value.min === 0 ? '' : value.min}
											onChange={e =>
												onChange({
													min: e.target.value,
													max: value.max,
												})
											}
											className={classNames(
												'inline h-full w-full appearance-none bg-[#00000000] text-center focus:outline-none',
												edit
													? 'rounded-md border-2 border-slate-7 focus:border-slate-2'
													: '',
											)}
											{...field}
										/>
									</div>
									<div>-</div>
									<div
										className={classNames(
											edit ? 'h-full w-full' : 'h-5 w-10',
											value.max === '∞' && 'text-xl font-light leading-none',
										)}
									>
										<input
											value={value.max === 0 ? '' : value.max}
											onChange={e =>
												onChange({
													max: e.target.value,
													min: value.min,
												})
											}
											className={classNames(
												'inline h-full w-full appearance-none bg-[#00000000] text-center focus:outline-none',
												edit
													? 'rounded-md border-2 border-slate-7 focus:border-slate-2 '
													: '',
											)}
											{...field}
										/>
									</div>
								</motion.div>
							</div> */}

						<Slider
							aria-label="Temperature"
							value={[sliderValue(value.min), sliderValue(value.max)]}
							onChange={(event, value) => {
								// mui always return both values as long as
								// two values are also passed in for 'value'
								const values = value as [number, number]

								// check for overlap
								if (values[0] === values[1]) {
								}
								const newMinValue = convertNumberToString(
									valueMap[Number(values[0])],
								)

								const newMaxValue = convertNumberToString(
									valueMapMax[Number(values[1])],
								)

								onChange({ min: newMinValue, max: newMaxValue })
							}}
							{...field}
							step={1}
							marks
							min={0}
							max={9}
							valueLabelFormat={(v, i) => {
								const min = i === 0
								return (
									<div
										className={classNames(
											'text-slate-11',
											min
												? 'text-xs'
												: value.max === '∞'
												? 'text-lg font-light leading-none'
												: 'text-xs',
										)}
									>
										{min ? value.min : value.max}
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
					</>
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

const overlapAdjusted = (
	numbers: [number, number],
	max: number,
): [number, number] => {
	if (numbers[0] !== numbers[1]) {
		return numbers
	}
	if (numbers.some(n => n === max)) {
		return [numbers[0] - 1, numbers[1]]
	}

	return [numbers[0], numbers[1] + 1]
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
