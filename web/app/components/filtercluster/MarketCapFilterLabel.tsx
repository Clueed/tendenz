import { Icon } from '@tendenz/icons'
import { PopRoot, PopTrigger, PopoverContentStyled } from '../Pop2'
import { PopLearnMore } from '../PopLearnMore'

export default function MarketCapFilterLabel({}: {}) {
	return (
		<PopRoot>
			<PopTrigger className="text-xxs uppercase leading-none tracking-wider text-slate10 transition-colors duration-500 data-[state=open]:text-slate12">
				<span className="leading-none">market&nbsp;cap&nbsp;filter</span>{' '}
				<Icon
					name="radix-icons/question-mark-circled"
					className="inline align-baseline"
				/>
			</PopTrigger>
			<PopoverContentStyled color="slate">
				<p>
					Market Cap stands for <i>Market Capitalization</i> and measures a
					company&apos;s total value in the stock market.
				</p>
				<p className="mt-2">
					Drag the slider to see only companies within the selected market cap
					range.
				</p>
				<div className="flex justify-end">
					<PopLearnMore href="/docs/market-cap" color="slate" />
				</div>
			</PopoverContentStyled>
		</PopRoot>
	)
}
