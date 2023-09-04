'use client'

import { Variants, motion } from 'framer-motion'
import { useContext } from 'react'
import { useSigmaYesterday } from '../../lib/api/clientApi'
import { FilterContext } from '../FilterContextProvider'
import { LoadingError } from './LoadingError'
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
	expandedKey,
	last,
	handleNextPage,
}: {
	page: number
	expandedKey: string
	last: boolean
	handleNextPage: () => void
}) {
	const { typeLabels, minMarketCap } = useContext(FilterContext)

	const { data, isLoading, error, isValidating } = useSigmaYesterday({
		minMarketCap,
		page,
		typeGroups: typeLabels,
	})

	if (data && data.length > 0) {
		return (
			<>
				{data.map((entry, index) => (
					<motion.div
						layout
						key={entry.ticker}
						variants={variants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<SigmaCard entry={entry} expanded={expandedKey === entry.ticker} />
					</motion.div>
				))}
				{last && (
					<div className="mt-10">
						<NextPageButton
							handleNextPage={handleNextPage}
							isLoading={isLoading}
						/>
					</div>
				)}
			</>
		)
	}

	if (isLoading) {
		return (
			<div className="grid grid-cols-default">
				<div className="col-start-2 flex h-96 items-center justify-center">
					<div className="h-4 w-4 animate-spin rounded-full border-b-2 border-slate-a11" />
				</div>
			</div>
		)
	}

	return <LoadingError error={error} isValidating={isValidating} />
}
