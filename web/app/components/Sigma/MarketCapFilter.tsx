'use client'
import * as Slider from '@radix-ui/react-slider'
import { useContext } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterContext } from '../FilterContextProvider'
import {
	Inputs,
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
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
							className="relative flex touch-none select-none items-center"
							onValueChange={value => {
								const [min, max] = value
								const inputs = createInputsFromSlider({ min, max })
								fieldOnChange(inputs)
							}}
							onValueCommit={handleValueCommited}
						>
							<Slider.Track className="relative h-3 flex-grow bg-green-7">
								<Slider.Range className="absolute h-3 bg-pink-8" />
							</Slider.Track>
							<Slider.Thumb asChild>
								<div className="relative ">
									<div className="h-4 w-10 bg-tomato-9"></div>
									<div className="absolute inset-0 flex -translate-y-5 items-center justify-center">
										{fieldValue.string.min}
									</div>
								</div>
							</Slider.Thumb>
							<Slider.Thumb asChild>
								<div className="relative ">
									<div className="h-4 w-10 bg-tomato-9"></div>
									<div className="absolute inset-0 flex -translate-y-5 items-center justify-center">
										{fieldValue.string.max}
									</div>
								</div>
							</Slider.Thumb>
						</Slider.Root>
					</>
				)}
			/>
		</form>
	)
}
