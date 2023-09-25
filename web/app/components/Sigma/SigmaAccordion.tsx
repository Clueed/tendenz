'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
import * as Accordion from '@radix-ui/react-accordion'
import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useFilterStore } from '../../lib/stores/filterStore'
import { NextPageButton } from './NextPageButton'
import { SigmaAccordionItem } from './SigmaAccordionItem'
import { SigmaCard } from './SigmaCard'
import { SigmaEntryContext } from './SigmaEntryContext'

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
		<div className="grid h-[60rem] grid-cols-default items-start">
			<div
				className={clsx(
					'relative col-span-full col-start-1 sm:col-span-1 sm:col-start-2',
				)}
			>
				<LoadingOverlay
					loadingAnimation={loadingAnimation}
					handleAnimationIteration={() => {
						!isLoadingMore && setLoadingAnimation(false)
					}}
					size={size}
					error={error}
				/>
				<div className="max-h-[55rem] min-h-[30rem] w-full overflow-y-auto overflow-x-hidden">
					{error && <ErrorBar />}
					<Accordion.Root
						collapsible
						type="single"
						onValueChange={setExpandedKey}
						asChild
					>
						<motion.div layout className="">
							<AnimatePresence
								initial={false}
								mode="popLayout"
								presenceAffectsLayout
							>
								{data &&
									flatData.map(card => (
										<SigmaAccordionItem value={card.ticker} key={card.ticker}>
											<SigmaEntryContext.Provider value={card}>
												<SigmaCard expanded={expandedKey === card.ticker} />
											</SigmaEntryContext.Provider>
										</SigmaAccordionItem>
									))}
							</AnimatePresence>
						</motion.div>
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
	size,
	error,
}: {
	loadingAnimation: boolean
	handleAnimationIteration: () => void
	size: number
	error: any
}) {
	const pulsingStripe = (
		<div
			className={clsx(
				'h-[1px] rounded-full bg-gradient-to-r from-transparent via-slateA10 to-transparent transition-all',
				loadingAnimation && 'animate-border-width',
			)}
			onAnimationIteration={handleAnimationIteration}
		/>
	)

	return (
		<div
			className={clsx(
				'absolute -inset-2 -z-10 flex flex-col items-center justify-between transition-colors duration-1000 sm:rounded-2xl',
				size > 1 && 'bg-slateA2',
				error && 'bg-tomatoA3',
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
