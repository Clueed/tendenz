'use client'
import classNames from 'classnames'
import Pop from '../Pop'
import { PopLearnMore } from './PopLearnMore'

export default function MarketCapFilterLabel({}: {}) {
	return (
		<Pop popoverColor="slate" offset={0} popoverContent={popoverContent}>
			{open => (
				<div
					className={classNames(
						'text-right text-xxs uppercase tracking-wider transition-colors',
						{
							'text-slate-10 duration-500': !open,
						},
						{ 'text-slate-12': open },
					)}
				>
					<span>market&nbsp;cap&nbsp;filter</span>{' '}
				</div>
			)}
		</Pop>
	)
}

const popoverContent = (
	<div className="relative w-[calc(var(--radix-popover-trigger-width)*2)] text-base">
		<p>
			Market Cap stands for <i>Market Capitalization</i> and measures a
			company&apos;s total value in the stock market.
		</p>
		<p className="mt-2">
			Change the minimum value to see smaller/larger companies.
		</p>
		<div className="flex justify-end">
			<PopLearnMore href="/docs/market-cap" color="slate" />
		</div>
	</div>
)
