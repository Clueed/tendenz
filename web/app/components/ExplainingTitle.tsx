'use client'
import classNames from 'classnames'
import Pop from './Pop'

export function ExplainingTitle() {
	return (
		<div className="grid grid-cols-default lg:text-center">
			<div className="col-start-2 text-lg leading-relaxed text-slate-11 ">
				<span className="text-xl">
					statistical probabilities of market close prices,{' '}
				</span>
				<br />
				based on{' '}
				<ExplainingTitlePopover
					popoverText="daily returns of each assets over the past two years"
					triggerText="historical returns"
				/>
				, <br />
				in units of standard deviation (σ), <br />
			</div>
		</div>
	)
}

export function ExplainingTitlePopover({
	popoverText,
	triggerText,
}: {
	popoverText: string
	triggerText: string
}) {
	return (
		<Pop
			offset={4}
			popoverColor="indigo"
			popoverContent={
				<div className="w-[calc(var(--radix-popover-trigger-width)*1.5)] text-base leading-relaxed text-indigo-12">
					{popoverText}
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
