import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { forwardRef } from 'react'
import { CardBackground } from './CardBackground'
import { SigmaCardBody } from './SigmaCardBody'
import { SigmaCardHeader } from './SigmaCardHeader'

const variants: Variants = {
	initial: {
		x: '5%',
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: '-5%',
		opacity: 0,
	},
}

export const SigmaAccordionItem = forwardRef<
	HTMLDivElement,
	Accordion.AccordionItemProps
>(function SigmaAccordionItemWrapper(
	{ value, children, className, onAnimationIteration, ...props },
	forwardedRef,
) {
	return (
		<Accordion.Item ref={forwardedRef} value={value} {...props} asChild>
			<motion.div
				layout
				key={value}
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{
					type: 'spring',
					duration: 1,
					bounce: 0.35,
				}}
				className={clsx(
					'group/card relative mb-2 grid grid-cols-default py-3 transition-opacity ',
					className,
				)}
				onAnimationIteration={onAnimationIteration}
			>
				{children}
			</motion.div>
		</Accordion.Item>
	)
})

export function SigmaCard({ expanded }: { expanded: boolean }) {
	return (
		<>
			<CardBackground expanded={expanded} />
			<Accordion.Trigger className="col-start-2 col-end-2 @container">
				<SigmaCardHeader expanded={expanded} />
			</Accordion.Trigger>
			<div className="col-span-2 col-start-2 @container sm:col-span-1 sm:col-start-2">
				<AnimatePresence presenceAffectsLayout>
					{expanded && (
						<Accordion.Content asChild forceMount>
							<motion.div
								initial={{
									height: 0,
									opacity: 0,
								}}
								animate={{
									height: 'auto',
									opacity: 1,
								}}
								exit={{
									height: 0,
									opacity: 0,
								}}
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
		</>
	)
}
