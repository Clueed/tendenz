'use client'
import * as Slider from '@radix-ui/react-slider'
import classNames from 'classnames'
import { HTMLAttributes, ReactNode, useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext } from '../FilterContextProvider'
import {
	Inputs,
	areNextToEachOther,
	createInputsFromSlider,
	createInputsFromValue,
	valueLength,
} from './marketCapFilterLib'

export default function MarketCapFilter({}: {}) {
	const { marketCap, setMarketCap } = useContext(FilterContext)

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
			className="w-full self-end justify-self-end"
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
							className="relative mb-2 flex h-8 cursor-pointer touch-none select-none items-center pt-7 sm:w-48"
							onValueChange={value => {
								const [min, max] = value
								const inputs = createInputsFromSlider({ min, max })
								fieldOnChange(inputs)
							}}
							onValueCommit={handleValueCommited}
						>
							<Slider.Track className="relative h-1.5 flex-grow rounded-full bg-slate-7">
								<Slider.Range className="absolute h-full rounded-full bg-slate-10" />
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
	<Slider.Thumb asChild>
		<div className="relative ">
			<div className="h-0 w-0 bg-tomato-9"></div>
			{children}
		</div>
	</Slider.Thumb>
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
		className={classNames(
			className,
			'absolute inset-0 flex -translate-y-5 items-center transition-all',
			{ 'justify-center': alignToThumb === 'center' },
			{ 'justify-end': alignToThumb === 'left' },
			{ 'justify-start': alignToThumb === 'right' },
			'text-sm text-slate-11',
		)}
	>
		{children}
	</div>
)
