'use client'
import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { HTMLAttributes, ReactNode } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useFilterStore } from '../../lib/stores/filterStore'
import {
	Inputs,
	areNextToEachOther,
	createInputsFromSlider,
	createInputsFromValue,
	valueLength,
} from './marketCapFilterLib'

export default function MarketCapFilter({}: {}) {
	const setMarketCap = useFilterStore(state => state.setMarketCap)
	const marketCap = useFilterStore(state => state.marketCap)

	const {
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<Inputs>({
		defaultValues: {
			marketCapFilter: createInputsFromValue({
				min: marketCap.min,
				max: marketCap.max,
			}),
		},
	})

	const onSubmit: SubmitHandler<Inputs> = ({}) => {}

	const handleValueCommited = () => {
		const { min, max } = getValues('marketCapFilter.number')
		setMarketCap({
			min,
			max,
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full self-end justify-self-end sm:w-48"
		>
			<Controller
				control={control}
				name="marketCapFilter"
				render={({
					field: { onChange: fieldOnChange, value: fieldValue, ...field },
				}) => (
					<>
						<Slider.Root
							{...field}
							value={[fieldValue.slider.min, fieldValue.slider.max]}
							step={1}
							min={0}
							max={valueLength}
							minStepsBetweenThumbs={1}
							className="relative mb-2 flex h-8  cursor-pointer touch-none select-none items-center pt-7 "
							onValueChange={value => {
								const [min, max] = value
								const inputs = createInputsFromSlider({ min, max })
								fieldOnChange(inputs)
							}}
							onValueCommit={handleValueCommited}
						>
							<Slider.Track className="relative h-1.5 flex-grow rounded-full bg-slate7">
								<Slider.Range className="absolute h-full rounded-full bg-slate10" />
							</Slider.Track>
							<Thumb>
								<ThumbLabel
									alignToThumb={
										fieldValue.slider.min === 0
											? 'right'
											: areNextToEachOther(fieldValue)
											? 'left'
											: 'center'
									}
								>
									{fieldValue.string.min}
								</ThumbLabel>
							</Thumb>
							<Thumb>
								<ThumbLabel
									alignToThumb={
										fieldValue.slider.max === valueLength
											? 'left'
											: areNextToEachOther(fieldValue)
											? 'right'
											: 'center'
									}
								>
									{fieldValue.string.max}
								</ThumbLabel>
							</Thumb>
						</Slider.Root>
					</>
				)}
			/>
		</form>
	)
}

const Thumb = ({ children }: { children: ReactNode }) => (
	<AnimatePresence>
		<Slider.Thumb asChild>
			<motion.div
				className="relative"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
			>
				{/* <div className="h-2 w-2 bg-tomato9"></div> */}
				{children}
			</motion.div>
		</Slider.Thumb>
	</AnimatePresence>
)

const ThumbLabel = ({
	children,
	className,
	alignToThumb = 'center',
	...props
}: HTMLAttributes<HTMLDivElement> & {
	alignToThumb?: 'left' | 'right' | 'center'
}) => (
	<div
		{...props}
		className={clsx(
			className,
			'absolute inset-0 flex -translate-y-5 items-center transition-all',
			{ 'justify-center': alignToThumb === 'center' },
			{ 'justify-end': alignToThumb === 'left' },
			{ 'justify-start': alignToThumb === 'right' },
			'text-sm text-slate11',
		)}
	>
		{children}
	</div>
)
