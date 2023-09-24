import { ReactNode } from 'react'
import { PopRoot, PopoverContentStyled } from '../Pop2'
import { PopLearnMore } from '../PopLearnMore'
import { HeroPopTrigger } from './HeroPopTrigger'
const popoverColor = 'indigo'
export const StatPopover = ({ children }: { children: ReactNode }) => (
	<PopRoot>
		<HeroPopTrigger>{children}</HeroPopTrigger>
		<PopoverContentStyled color={popoverColor}>
			<p>
				By combining an asset&apos;s average prices with its average volatility,
				we can estimate the likelihood of the most recent closing price
				(measured by sigma σ).
			</p>
			<p className="mt-2">
				A high σ indicates an unusual or extraordinary change in price.
			</p>
			<div className="flex justify-end">
				<PopLearnMore
					color={popoverColor}
					href={'/docs/statistical-significants'}
				/>
			</div>
		</PopoverContentStyled>
	</PopRoot>
)
export const HistoricalPopover = ({ children }: { children: ReactNode }) => (
	<PopRoot>
		<HeroPopTrigger>{children}</HeroPopTrigger>
		<PopoverContentStyled color={popoverColor}>
			<p>We use the daily returns of each assets over the past two years.</p>
		</PopoverContentStyled>
	</PopRoot>
)
