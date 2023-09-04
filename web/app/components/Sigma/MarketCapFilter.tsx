import * as Slider from '@radix-ui/react-slider'
import { Dispatch, SetStateAction, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

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

export default function MarketCapFilter<T extends string[]>({
	selectedKey,
	selectKey,
	allKeys,
}: {
	selectedKey: T[number]
	selectKey: Dispatch<SetStateAction<T[number]>>
	allKeys: T
}) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
		setValue,
	} = useForm<Inputs>({
		defaultValues: {
			textfield: '1b',
		},
	})
	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
	}
	const [minMarketCap, setMinMarketCap] = useState<number>(1e9)

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
								value={[
									Number(
										Object.entries(valueMap)
											.reverse()
											.find(
												([index, value]) =>
													value <= convertStringToNumber(field.value),
											)?.[0],
									),
								]}
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
