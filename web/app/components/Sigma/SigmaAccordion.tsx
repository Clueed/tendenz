'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../FilterContextProvider'
import { PageOfSigmaCards } from './PageOfSigmaCards'
import SigmaCard from './SigmaCard'

export function SigmaAccordion({}: {}) {
	const { marketCap, typeLabels } = useContext(FilterContext)
	useEffect(() => {
		setPageIndex(1)
	}, [marketCap, typeLabels])

	const [expandedKey, setExpandedKey] = useState<string>('')

	const [pageIndex, setPageIndex] = useState<number>(1)
	function handleNextPage() {
		const nextPage = pageIndex + 1
		setPageIndex(nextPage)
	}

	const { data, size, setSize } = useSigmaYesterdayInfinite()

	console.log('pages2 :>> ', data)

	const pages = [...Array(pageIndex).keys()].map(key => (
		<PageOfSigmaCards
			page={key}
			key={key}
			expandedKey={expandedKey}
			last={key === pageIndex - 1}
			handleNextPage={handleNextPage}
		/>
	))

	return (
		<div className="grid-cols-default sm:grid">
			<div
				className={clsx(
					'col-start-2 -mx-2 box-border h-[50rem] overflow-x-hidden overflow-y-scroll px-2 py-2 transition-all duration-1000 sm:rounded-2xl',
					pageIndex > 1 &&
						'bg-gradient-to-b from-slate-a2 via-transparent to-slate-a2',
				)}
			>
				<Accordion.Root
					collapsible
					type="single"
					onValueChange={o => setExpandedKey(o)}
					className=""
				>
					<AnimatePresence initial={false}>
						{data &&
							data.map(page =>
								page.map(entry => (
									<motion.div
										layout
										key={entry.ticker}
										variants={variants}
										initial="initial"
										animate="animate"
										exit="exit"
									>
										<SigmaCard
											entry={entry}
											expanded={expandedKey === entry.ticker}
											onAnimationIteration={() => {}}
											className={clsx(false && 'animate-pulse')}
										/>
									</motion.div>
								)),
							)}
					</AnimatePresence>
				</Accordion.Root>
			</div>
		</div>
	)
}

const transition = {
	type: 'spring',
	duration: 1,
	bounce: 0.35,
}

export const variants: Variants = {
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
