'use client'
import { DEFAULT_MIN_MARKETCAP } from '@/app/lib/MARKET_CAP_BUCKETS'
import { Slider } from '@mui/base'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext, MarketCapFilter } from '../FilterContextProvider'
import {
	Inputs,
	createInputsFromSlider,
	createInputsFromValue,
	nextToEachOther,
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
			setMarketCap({
				min,
				max,
			})
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [localMarketCap, setMarketCap])

	const style = {
		railTrackHeight: 'h-5 sm:h-2',
		thumbHeight: 'h-5 w-0 sm:h-2 sm:w-2',
		rootHeight: 'h-7', // needs to be account for absolute-positioned valueLabels
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<Controller
				control={control}
				name="marketCapFilter"
				render={({
					field: { onChange: fieldOnChange, value: fieldValue, ...field },
				}) => (
					<Slider
						className="transition-[width,_height]"
						value={[fieldValue.slider.min, fieldValue.slider.max]}
						onChange={(_, value) => {
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
								<span
									className={classNames(
										'absolute',
										nextToEachOther(fieldValue)
											? min
												? '-translate-x-1'
												: 'translate-x-1'
											: '',
									)}
								>
									{min ? fieldValue.string.min : fieldValue.string.max}
								</span>
							)
						}}
						slots={{
							valueLabel: ({ children, ...rest }) => (
								<span {...rest}>{children}</span>
							),
							thumb: ({ children, className, ...rest }) => (
								<span
									{...rest}
									className="absolute top-1 inline-flex -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-center"
								>
									<div
										className={classNames(
											'origin-center scale-100 rounded-full bg-slate-9 transition-[width,_height,_opacity,_transform] duration-500',
											'sm:opacity-100',
											'group-hover/mc-cluster:scale-150 group-hover/mc-cluster:opacity-100',
											style.thumbHeight,
										)}
									/>
									{
										// children is only valueLabel
									}
									{children}
								</span>
							),
							track: ({ children, ...rest }) => (
								<span className="absolute inset-0 h-full w-full overflow-hidden rounded-md">
									<span {...rest}>{children}</span>
								</span>
							),
						}}
						slotProps={{
							root: {
								className: classNames(
									'relative inline-block w-full cursor-pointer',
									style.rootHeight,
								),
							},
							rail: {
								className: classNames(
									'absolute block w-full overflow-hidden rounded-md bg-slate-a4',
									'sm:rounded-full sm:bg-slate-a6',
									style.railTrackHeight,
								),
							},
							track: {
								className: classNames(
									'absolute my-auto bg-slate-a5',
									'sm:rounded-full sm:bg-slate-a8',
									style.railTrackHeight,
									'group-hover/mc-cluster:bg-slate-11',
								),
							},
							valueLabel: {
								className: classNames(
									'text-base text-slate-a11 transition-all duration-500 sm:text-xs',
									'group-hover/mc-cluster:text-base group-hover/mc-cluster:text-slate-12',
								),
							},
						}}
					/>
				)}
			/>
		</form>
	)
}
