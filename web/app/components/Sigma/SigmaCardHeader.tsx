import { SigmaEntryContext } from '@/app/components/sigma/SigmaEntryContext'
import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { forwardRef, useContext, useEffect, useState } from 'react'

export const SigmaCardHeader = forwardRef<
	HTMLButtonElement,
	Accordion.AccordionTriggerProps & { expanded: boolean }
>(function SigmaCardHeader({ expanded, ...props }, forwardedRef) {
	const { sigma, ticker, name } = useContext(SigmaEntryContext)
	const formattedSigma = Math.abs(sigma).toFixed(2)

	// All of truncation stuff here addresses the issue that
	// on the close animation if truncation happens during/before
	// there are animation artifacts.
	// This setup delays truncation until after the animation has completed
	// but keeps the immidiate 'untrucation' on expansion
	// (there a delay is not tollerable and produces no artifacts).
	// It's still not ideal because the truncation is delay so much that I causes seemingly random movement
	// when the user has moved on.

	const [trunc, setTrunc] = useState<Boolean>(expanded ? false : true)
	useEffect(() => {
		if (expanded) setTrunc(false)
	}, [expanded])

	return (
		<button
			{...props}
			ref={forwardedRef}
			className={'flex w-full cursor-pointer items-baseline gap-x-4 px-3'}
		>
			<div className="items-top flex w-[8.5rem] justify-end gap-1">
				<div
					className={clsx('text-right text-2xl leading-none ', {
						'text-red12': sigma < 0,
						'text-green12': sigma > 0,
					})}
				>
					{formattedSigma}
				</div>
				<div
					className={clsx('text-sm leading-tight', {
						'text-red12/75': sigma < 0,
						'text-green12/75': sigma > 0,
					})}
				>
					σ
				</div>
			</div>

			<motion.div
				onAnimationComplete={() => {
					if (!expanded) setTrunc(true)
				}}
				initial={{ height: 'calc(1.75rem)' }}
				animate={{
					height: expanded ? 'auto' : 'calc(1.75rem)',
					transition: {
						ease: 'easeInOut',
						duration: 0.75,
					},
				}}
				className={'w-full overflow-hidden pr-5 text-left text-xl'}
			>
				<div className={clsx({ truncate: expanded ? false : trunc })}>
					<span className="mr-1 text-slate11">{ticker}</span>
					{'  '}
					<span className="text-slate12">{name}</span>
				</div>
			</motion.div>
		</button>
	)
})
