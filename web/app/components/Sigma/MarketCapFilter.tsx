import * as Slider from '@radix-ui/react-slider'
import { Dispatch, SetStateAction, useState } from 'react'
export default function MarketCapFilter<T extends string[]>({
	selectedKey,
	selectKey,
	allKeys,
}: {
	selectedKey: T[number]
	selectKey: Dispatch<SetStateAction<T[number]>>
	allKeys: T
}) {
	const [minMarketCap, setMinMarketCap] = useState<number>(1e9)

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

	function handleSlider(value: number) {
		setSliderValue(value)
		console.log('value :>> ', value)

		const newMinMarketCap = valueMap[value]
		setMinMarketCap(newMinMarketCap)
		setInputValue(convertNumberToString(newMinMarketCap))
	}

	function handleInput(input: string) {
		setInputValue(input)

		const number = convertNumber(input)
		setMinMarketCap(number)

		console.log('Object.entries(valueMap) :>> ', Object.entries(valueMap))
		for (const i of Object.entries(valueMap)) {
			console.log('i :>> ', i)
			if (i[1] >= number) {
				console.log('i[1] :>> ', i[1])
				setSliderValue(Number(i[0]))
				break
			}
		}
	}

	const [sliderValue, setSliderValue] = useState<number>(5)
	const [inputValue, setInputValue] = useState<string>(
		convertNumberToString(minMarketCap),
	)

	return (
		<div>
			<form>
				${' '}
				<input
					value={inputValue}
					className="bg-slate-a1 tracking-wide"
					onChange={e => handleInput(e.target.value)}
				/>
				<Slider.Root
					className="relative flex h-5 w-full touch-none select-none items-center"
					max={9}
					step={1}
					value={[sliderValue]}
					onValueChange={v => handleSlider(v[0])}
				>
					<Slider.Track className="relative h-[3px] grow rounded-full bg-slate-a5">
						<Slider.Range className="absolute h-full rounded-full bg-slate-a10" />
					</Slider.Track>
					<Slider.Thumb
						className="focus:shadow-blackA8 block h-4 w-4 rounded-[10px] bg-slate-11 hover:bg-violet-5 focus:shadow-[0_0_0_5px] focus:outline-none"
						aria-label="Volume"
					/>
				</Slider.Root>
			</form>
		</div>
	)
}

function convertNumber(input: string) {
	const numberPattern = /^(\d+(\.\d+)?)\s*([kKmMbBtT])?$/
	const match = input.trim().match(numberPattern)

	console.log('match :>> ', match)

	if (!match) {
		// Invalid input
		return NaN
	}

	const value = parseFloat(match[1])
	const suffix = match[3]

	if (isNaN(value)) {
		return NaN
	}

	if (suffix) {
		switch (suffix.toLowerCase()) {
			case 'k':
				return value * 1e3
			case 'm':
				return value * 1e6
			case 'b':
				return value * 1e9
			case 't':
				return value * 1e12
			default:
				// Invalid suffix
				return NaN
		}
	}

	return value
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
