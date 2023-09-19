import clsx from 'clsx'
import { getMarketCapCategory } from '../../lib/getMarketCapCategory'
import Pop from '../Pop'
import { PopLearnMore } from '../PopLearnMore'
import { Tag } from './Tag'

export function MarketCap({
	marketCap,
	ticker,
}: {
	marketCap: number
	ticker: string
}) {
	const { rounded, unit, bucket, formatted } = getMarketCapCategory(marketCap)
	return (
		<Pop
			offset={1}
			popoverColor="slate"
			popoverContent={
				<div className="w-36">
					<div>
						{ticker} has a market capitalization of ~${rounded} {unit}.
					</div>
					<div className="flex justify-end">
						<PopLearnMore color="slate" href="/docs/market-cap" />
					</div>
				</div>
			}
		>
			<Tag
				className={clsx(
					'tracking-widest',
					'hover:bg-slateA5 hover:text-slate12',
					'group-radix-state-open:bg-slateA5 group-radix-state-open:text-slate12',
				)}
			>
				{formatted}
			</Tag>
		</Pop>
	)
}
