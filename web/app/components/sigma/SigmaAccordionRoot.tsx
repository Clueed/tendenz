'use client'
import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef } from 'react'

export const SigmaAccordionRoot = forwardRef<
	HTMLDivElement,
	Omit<Accordion.AccordionSingleProps, 'collapsible' | 'type'>
>(function SigmaAccordionRoot({ children, ...props }, forwardedRef) {
	return (
		<Accordion.Root
			collapsible
			type="single"
			{...props}
			ref={forwardedRef}
			asChild
		>
			<motion.div layout>
				<AnimatePresence initial={false} mode="popLayout" presenceAffectsLayout>
					{children}
				</AnimatePresence>
			</motion.div>
		</Accordion.Root>
	)
})
