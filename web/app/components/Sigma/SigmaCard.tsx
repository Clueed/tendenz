import * as Accordion from '@radix-ui/react-accordion'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import clsx from 'clsx'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { ForwardedRef, forwardRef } from 'react'
import { SigmaCardBody } from './SigmaCardBody'
import { SigmaCardHeader } from './SigmaCardHeader'
import { SigmaEntryContext } from './SigmaEntryContext'

const transition = {
	type: 'spring',
	duration: 1,
	bounce: 0.35,
}

const variants: Variants = {
	initial: {
		x: '2.5vw',
		opacity: 0,
		transition,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition,
	},
	exit: {
		x: '-2.5vw',
		opacity: 0,
		transition,
	},
}

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
					'group/card relative mb-2 grid grid-cols-default py-3 transition-opacity ',
					className,
				)}
				onAnimationIteration={onAnimationIteration}
			>
				<SigmaEntryContext.Provider value={entry}>
					<CardBackground expanded={expanded} positive={positive} />
					<Accordion.Trigger asChild>
						<div className="col-start-2 col-end-2 @container">
							<SigmaCardHeader expanded={expanded} />
						</div>
					</Accordion.Trigger>
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
										<SigmaCardBody />
									</motion.div>
								</Accordion.Content>
							)}
						</AnimatePresence>
					</div>
				</SigmaEntryContext.Provider>
			</motion.div>
		</Accordion.Item>
	)
})

const CardBackground = ({
	expanded,
	positive,
}: {
	expanded: boolean
	positive: boolean
}) => (
	<div
		className={clsx(
			'absolute inset-0 -z-10 col-span-full transition-all sm:col-start-2 sm:col-end-2 sm:rounded-xl',
			{
				'group-hover/card:bg-slate-a3': !expanded,
				'bg-gradient-to-br from-lime-a3 to-teal-a4': expanded && positive,
				'bg-gradient-to-br from-orange-a3 to-purple-a4': expanded && !positive,
			},
		)}
	/>
)
