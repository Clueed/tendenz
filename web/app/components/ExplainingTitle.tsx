'use client'
import classNames from 'classnames'
import { ReactNode } from 'react'
import Pop from './Pop'
import { PopLearnMore } from './Sigma/PopLearnMore'

export function ExplainingTitle() {
	return (
		<div className="grid grid-cols-default lg:text-center">
			<div className="col-start-2 text-slate-11 ">
				<span className="text-xl leading-9">
					<ExplainingTitlePopover
						learnMore="/docs#statistical-significants"
						popoverText={
							<>
								<p>
									By combining the asset&apos;s average closing price and
									volatility, we can estimate the likelihood of the most recent
									closing price (measured by sigma σ) .
								</p>
								<p className="mt-2">
									A high σ indicates an unusual or extraordinary change in
									price.
								</p>
							</>
						}
						triggerText="statistical probabilities"
					/>{' '}
					of market close prices <br />
				</span>
				<span className="text-lg leading-9">
					based on{' '}
					<ExplainingTitlePopover
						learnMore={false}
						popoverText="We use the daily returns of each assets over the past two years."
						triggerText="historical returns"
					/>
				</span>
			</div>
		</div>
	)
}

export function ExplainingTitlePopover({
	popoverText,
	triggerText,
	learnMore,
}: {
	popoverText: string | ReactNode
	triggerText: string | ReactNode
	learnMore?: false | string
}) {
	const color = 'indigo'
	return (
		<Pop
			offset={0}
			popoverColor={color}
			popoverContent={
				<div className="w-[calc(var(--radix-popover-trigger-width)*1.5)] text-base leading-relaxed">
					{popoverText}
					<div className="flex justify-end">
						{learnMore && <PopLearnMore color={color} href={learnMore} />}
					</div>
				</div>
			}
		>
			{open => (
				<span
					className={classNames('border-b-2 transition-colors', {
						'border-slate-a7 duration-500 hover:border-slate-a9 hover:text-slate-a12':
							!open,
						'border-indigo-a8 text-indigo-12': open,
					})}
				>
					{triggerText}
				</span>
			)}
		</Pop>
	)
}
