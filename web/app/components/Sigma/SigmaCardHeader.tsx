import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { forwardRef, useContext, useEffect, useState } from 'react'
import { SigmaEntryContext } from './SigmaEntryContext'

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
			<div className="flex items-center justify-end">
				<div className="w-[6rem] text-right text-2xl leading-none text-indigo12">
					{formattedSigma}
				</div>
				<div className="ml-1 flex flex-col text-xl">
					<div
						className={clsx('-my-1 text-xxs opacity-90', {
							'text-redA11': sigma < 0,
							'text-greenA11': sigma > 0,
						})}
					>
						{sigma < 0 ? '↓' : '↑'}
					</div>
					<div className="-my-1 text-sm text-slate10">σ</div>
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
