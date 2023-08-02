'use client'
import classNames from 'classnames'
import { ReactNode } from 'react'
import Pop from './Pop'
import { PopLearnMore } from './Sigma/PopLearnMore'

export function ExplainingTitle() {
	return (
		<div className="grid grid-cols-default lg:text-center">
			<div className="col-start-2 text-lg leading-10 text-slate-11 ">
				<span className="text-xl">
					<ExplainingTitlePopover
						popoverText={
							<>
								<p>
									By combining the asset&apos;s average closing price and
									volatility, we can estimate the likelihood of the most recent
									closing price{' '}
									<span className="opacity-75"> (measured by sigma, σ)</span>.
								</p>
								<p className="mt-2">
									A high σ signifies indicates an unusual or extraordinary
									change in price.
								</p>
							</>
						}
						triggerText="statistical probabilities"
					/>{' '}
					of market close prices{' '}
				</span>
				<br />
				based on{' '}
				<ExplainingTitlePopover
					popoverText="We use the daily returns of each assets over the past two years."
					triggerText="historical returns"
				/>
			</div>
		</div>
	)
}

export function ExplainingTitlePopover({
	popoverText,
	triggerText,
}: {
	popoverText: string | ReactNode
	triggerText: string | ReactNode
}) {
	const color = 'indigo'
	return (
		<Pop
			offset={4}
			popoverColor={color}
			popoverContent={
				<div className="w-[calc(var(--radix-popover-trigger-width)*1.5)] text-base leading-relaxed">
					{popoverText}
					<div className="flex justify-end">
						<PopLearnMore color={color} href="/docs" />
					</div>
				</div>
			}
		>
			{open => (
				<span
					className={classNames('border-b-2 border-slate-8 transition-colors', {
						'border-indigo-12 text-indigo-12': open,
					})}
				>
					{triggerText}
				</span>
			)}
		</Pop>
	)
}
