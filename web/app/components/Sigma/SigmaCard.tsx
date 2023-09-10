import * as Accordion from '@radix-ui/react-accordion'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'
import { variants } from './SigmaAccordion'
import { SigmaCardBody } from './SigmaCardBody'
import { SigmaCardHeader } from './SigmaCardHeader'

export const SigmaCard = forwardRef(function SigmaCard(
	{
		entry,
		expanded,
		className,
		onAnimationIteration,
	}: {
		entry: tendenzApiSigmaYesterday
		expanded: boolean
		className?: string
		onAnimationIteration?: () => void
	},
	ref: ForwardedRef<HTMLDivElement>,
) {
	const positive = entry.sigma > 0

	return (
		<Accordion.Item ref={ref} value={entry.ticker} asChild>
			<motion.div
				layout
				key={entry.ticker}
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				className={clsx(
					'group/card relative mb-2 grid grid-cols-default py-3 transition-opacity',
					className,
				)}
				onAnimationIteration={onAnimationIteration}
			>
				<div
					className={clsx(
						'absolute inset-0 -z-10 col-span-full transition-all sm:col-start-2 sm:col-end-2 sm:rounded-xl',
						{
							'group-hover/card:bg-slate-a3': !expanded,
							'bg-gradient-to-br from-lime-a3 to-teal-a4': expanded && positive,
							'bg-gradient-to-br from-orange-a3 to-purple-a4':
								expanded && !positive,
						},
					)}
				/>
				<div className="col-start-2 col-end-2 @container">
					<Accordion.Trigger className="w-full">
						<SigmaCardHeader
							expanded={expanded}
							name={entry.name}
							sigma={entry.sigma}
							marketCap={entry.marketCap}
							ticker={entry.ticker}
							type={entry.type}
						/>
					</Accordion.Trigger>
				</div>
				<div className="col-span-2 col-start-2 @container sm:col-span-1 sm:col-start-2">
					<AnimatePresence presenceAffectsLayout>
						{expanded && (
							<Accordion.Content asChild forceMount>
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{
										height: 'auto',
										opacity: 1,
									}}
									exit={{ height: 0, opacity: 0 }}
									transition={{
										ease: 'easeInOut',
										duration: 0.5,
									}}
									className={'overflow-hidden'}
								>
									<SigmaCardBody
										last={entry.last}
										secondLast={entry.secondLast}
										ticker={entry.ticker}
									/>
								</motion.div>
							</Accordion.Content>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</Accordion.Item>
	)
})
