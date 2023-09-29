import { useContext } from 'react'
import { getMarketCapCategory } from '../../lib/getMarketCapCategory'
import { PopRoot, PopoverContentStyled } from '../Pop2'
import { PopLearnMore } from '../PopLearnMore'
import { SigmaEntryContext } from './SigmaEntryContext'
import { TagPopoverTrigger } from './TagPopoverTrigger'

export function MarketCapTag({}: {}) {
	const { marketCap, ticker } = useContext(SigmaEntryContext)
	const { rounded, unit, formatted } = getMarketCapCategory(marketCap)

	return (
		<PopRoot>
			<TagPopoverTrigger>{formatted}</TagPopoverTrigger>
			<PopoverContentStyled color="slate">
				<p>
					{ticker} has a market capitalization of ~${rounded} {unit}.
				</p>
				<div className="flex justify-end">
					<PopLearnMore color="slate" href="/docs/market-cap" />
				</div>
			</PopoverContentStyled>
		</PopRoot>
	)
}
