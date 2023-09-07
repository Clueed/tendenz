'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import { Slider } from '@mui/base'
import classNames from 'classnames'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext, MarketCapFilter } from '../FilterContextProvider'
import {
	Inputs,
	areNextToEachOther,
	createInputsFromSlider,
	createInputsFromValue,
	valueLength,
} from './marketCapFilterLib'

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
						{...field}
						step={1}
						min={0}
						max={valueLength}
						value={[fieldValue.slider.min, fieldValue.slider.max]}
						onChange={(_, value) => {
							const [min, max] = value as [number, number]
							const inputs = createInputsFromSlider({ min, max })
							fieldOnChange(inputs)
						}}
						valueLabelFormat={(value, index) =>
							valueLabelFormat(
								value,
								0,
								valueLength,
								index,
								fieldValue.string,
								areNextToEachOther(fieldValue),
							)
						}
						slots={{
							valueLabel: ValueLabel,
							thumb: Thumb,
							track: Track,
						}}
						slotProps={slotProps}
					/>
				)}
			/>
		</form>
	)
}

const style = {
	rootHeight:
		'h-2 focus-within:max-sm:h-5 mt-5 group max-sm:mt-10 transition-[margin,_height]', // padding for absolute-positioned valueLabels
	railSize:
		'h-2 group-focus-within:max-sm:h-5 rounded-full transition-[height]', // sizes rail also overflow-clips track
	trackSize: 'h-2 group-focus-within:max-sm:h-5 transition-[height]',
	thumbHeight:
		'h-2 group-focus-within:max-sm:h-5 group-focus-within:max-sm:w-5 w-2 transition-all',
}

const slotProps = {
	root: {
		className: classNames(
			'relative inline-block w-full cursor-pointer',
			style.rootHeight,
		),
	},
	rail: {
		className: classNames('absolute block w-full bg-slate-a6', style.railSize),
	},
	track: {
		className: classNames('absolute bg-slate-9', style.trackSize),
	},
}

const Thumb = ({ children, className, ...props }: any) => (
	<span {...props} className="absolute text-center sm:top-1">
		{
			// children is valueLabel
		}
		{children}
		<div
			className={classNames(
				'origin-center rounded-full bg-slate-9',
				style.thumbHeight,
			)}
		/>
	</span>
)
const Track = ({ children, className, ...props }: any) => (
	<span
		className={classNames('absolute inset-0 h-full w-full', style.railSize)}
	>
		<span {...props} className={className}>
			{children}
		</span>
	</span>
)
const ValueLabel = ({
	children,
	className,
	valueLabelFormat,
	...props
}: any) => (
	<span {...props} className={className}>
		{children}
		{
			//valueLabelFormat()
		}
	</span>
)

const valueLabelFormat = (
	value: number,
	minValue: number,
	maxValue: number,
	index: number,
	string: { min: string; max: string },
	nextToEachOther: boolean,
): ReactNode => {
	console.log('index :>> ', index)
	const min = index === 0
	const max = index === 1

	const outer = value === minValue || value === maxValue

	return (
		<span
			className={classNames(
				'absolute bottom-3 text-xs text-slate-a11 transition-all delay-500 duration-500 ease-in-out',
				{ '-translate-x-full': max && outer },
				{ '-translate-x-1/2': max && !outer },
				{ '-translate-x-1/2': min && !outer },
				'group-focus-within:delay-0 group-focus-within:max-sm:-translate-y-2 group-focus-within:max-sm:text-base',
			)}
		>
			{max ? string.max : string.min}
		</span>
	)
}
