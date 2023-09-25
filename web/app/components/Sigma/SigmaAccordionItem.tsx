import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { Variants, motion } from 'framer-motion'
import { forwardRef } from 'react'

export const variants: Variants = {
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
