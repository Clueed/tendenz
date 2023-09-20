'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
import * as Accordion from '@radix-ui/react-accordion'
import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useFilterStore } from '../../lib/stores/filterStore'
import { NextPageButton } from './NextPageButton'
import { SigmaCard } from './SigmaCard'

export function SigmaAccordion() {
	const [expandedKey, setExpandedKey] = useState<string>('')

	const { data, size, setSize, isLoadingMore, error, flatData, isReachingEnd } =
		useSigmaYesterdayInfinite()

	const marketCap = useFilterStore(state => state.marketCap)
	const typeLabels = useFilterStore(state => state.typeLabels)

	const isMounted = useRef(false)
	useEffect(() => {
		if (isMounted.current) {
			setLoadingAnimation(true)
		} else {
			isMounted.current = true
		}
	}, [marketCap, typeLabels, size])
	const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)

	return (
		<div className="grid-cols-default sm:grid">
			<div
				className={clsx(
					'relative col-start-2 -mx-2 box-border overflow-hidden transition-all duration-1000 sm:rounded-2xl',
					size > 1 && 'bg-slateA2',
					error && 'bg-tomatoA3',
				)}
			>
				<LoadingOverlay
					loadingAnimation={loadingAnimation}
					handleAnimationIteration={() => {
						!isLoadingMore && setLoadingAnimation(false)
					}}
				/>
				<div className="max-h-[55rem] min-h-[30rem] overflow-y-auto overflow-x-hidden">
					{error && <ErrorBar />}
					<Accordion.Root
						collapsible
						type="single"
						onValueChange={setExpandedKey}
						className="px-2 py-2"
					>
						<AnimatePresence initial={false} mode="popLayout">
							{data &&
								flatData.map(card => (
									<SigmaCard
										key={card.ticker}
										entry={card}
										expanded={expandedKey === card.ticker}
									/>
								))}
						</AnimatePresence>
					</Accordion.Root>
					{!isReachingEnd && (
						<NextPageButton
							onClick={() => setSize(size + 1)}
							disabled={loadingAnimation}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

function LoadingOverlay({
	loadingAnimation,
	handleAnimationIteration,
}: {
	loadingAnimation: boolean
	handleAnimationIteration: () => void
}) {
	const pulsingStripe = (
		<div
			className={clsx(
				'left-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-slateA10 to-transparent transition-all',
				loadingAnimation && 'animate-border-width',
			)}
			onAnimationIteration={handleAnimationIteration}
		/>
	)

	return (
		<div
			className={clsx(
				'absolute inset-0 -z-10 flex h-full w-full flex-col items-center justify-between transition-all duration-1000',
				loadingAnimation && 'bg-slateA3',
			)}
		>
			{pulsingStripe}
			{pulsingStripe}
		</div>
	)
}

const ErrorBar = () => (
	<div className="flex items-center justify-center gap-2 bg-redA3 px-2 py-2 text-sm text-red12">
		<Icon name="phosphor-icons/fire" />
		something went wrong...
	</div>
)
