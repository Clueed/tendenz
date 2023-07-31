'use client'

import { useSigmaYesterday } from '@/app/misc/tendenzApi'
import { Variants, motion } from 'framer-motion'
import { NextPageButton } from './NextPageButton'
import SigmaCard from './SigmaCard'

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

export function PageOfSigmaCards({
	page,
	minMarketCap,
	expandedKey,
	last,
	handleNextPage,
}: {
	page: number
	minMarketCap: number
	expandedKey: string
	last: boolean
	handleNextPage: () => void
}) {
	const { data, error, isLoading, isValidating } = useSigmaYesterday(
		minMarketCap,
		page,
	)

	if (error) {
		return <span>error</span>
	}

	return (
		<>
			{data &&
				data.map(entry => (
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
							key={entry.ticker}
							expanded={expandedKey === entry.ticker}
						/>
					</motion.div>
				))}
			{last && (
				<NextPageButton handleNextPage={handleNextPage} isLoading={isLoading} />
			)}
		</>
	)
}
