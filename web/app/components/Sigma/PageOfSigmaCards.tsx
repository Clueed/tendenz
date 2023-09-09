'use client'

import { PAGE_SIZE } from '@tendenz/types'
import clsx from 'clsx'
import { Variants, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSigmaYesterday } from '../../lib/api/clientApi'
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
	const { data, isLoading, error, isValidating } = useSigmaYesterday(page)

	const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)

	const handleAnimationIteration = () => {
		if (!isLoading) {
			setLoadingAnimation(false)
		}
	}

	useEffect(() => {
		if (isLoading) {
			setLoadingAnimation(true)
		}
	}, [isLoading, data])

	if (data && data.length > 0) {
		return (
			<>
				{data.map(entry => (
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
							onAnimationIteration={handleAnimationIteration}
							className={clsx(loadingAnimation && 'animate-pulse')}
						/>
					</motion.div>
				))}
				{last && data.length >= PAGE_SIZE && (
					<div className="my-10">
						<NextPageButton
							handleNextPage={handleNextPage}
							isLoading={isLoading}
						/>
					</div>
				)}
			</>
		)
	}

	if (data && data.length === 0) {
		return (
			<div className="grid grid-cols-default">
				<div className="col-start-2 flex h-24 items-center justify-center">
					<div>the end.</div>
				</div>
			</div>
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
