'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
import * as Accordion from '@radix-ui/react-accordion'
import { PAGE_SIZE, tendenzApiSigmaYesterday } from '@tendenz/types'
import clsx from 'clsx'
import { AnimatePresence, Variants } from 'framer-motion'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FilterContext } from '../FilterContextProvider'
import IconFire from '../IconFire'
import { NextPageButton } from './NextPageButton'
import { SigmaCard } from './SigmaCard'

export function SigmaAccordion({}: {}) {
	const [expandedKey, setExpandedKey] = useState<string>('')

	const { marketCap, typeLabels } = useContext(FilterContext)

	const { data, size, setSize, isLoading, error } = useSigmaYesterdayInfinite()

	const cards = useMemo(
		() => (data ? ([] as tendenzApiSigmaYesterday[]).concat(...data) : []),
		[data],
	)

	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

	const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)

	const isMounted = useRef(false)

	useEffect(() => {
		if (isMounted.current) {
			setLoadingAnimation(true)
		} else {
			isMounted.current = true
		}
	}, [marketCap, typeLabels])

	const handleAnimationIteration = () => {
		!isLoadingMore && setLoadingAnimation(false)
	}

	const showError = error || (isEmpty && size === 1)

	return (
		<div className="grid-cols-default sm:grid">
			<div
				className={clsx(
					'relative col-start-2 -mx-2 box-border h-[50rem] overflow-x-hidden overflow-y-scroll transition-all duration-1000 sm:rounded-2xl',
					size > 1 && 'bg-slate-a2',
					loadingAnimation && 'bg-slate-a3',
					showError && 'bg-tomato-a3',
				)}
			>
				<div
					className={clsx(
						'absolute inset-0 flex w-full flex-col items-center justify-between',
						loadingAnimation ? 'flex' : 'hidden',
					)}
				>
					<div
						className={clsx(
							'left-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-slate-a10 to-transparent transition-all',
							loadingAnimation && 'animate-border-width',
						)}
						onAnimationIteration={handleAnimationIteration}
					/>

					<div
						className={clsx(
							'left-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-slate-a10 to-transparent transition-all',
							loadingAnimation && 'animate-border-width',
						)}
						onAnimationIteration={handleAnimationIteration}
					/>
				</div>
				{showError && (
					<div className="flex items-center justify-center gap-2 bg-red-a3 px-2 py-2 text-sm text-red-12">
						<IconFire />
						something went wrong...
					</div>
				)}

				<Accordion.Root
					collapsible
					type="single"
					onValueChange={o => setExpandedKey(o)}
					className="px-2 py-2"
				>
					<AnimatePresence initial={false} mode="popLayout">
						{data &&
							cards.map(card => (
								<SigmaCard
									key={card.ticker}
									entry={card}
									expanded={expandedKey === card.ticker}
								/>
							))}
					</AnimatePresence>
				</Accordion.Root>
				{!isReachingEnd && (
					<div className="my-10">
						<NextPageButton
							handleNextPage={() => setSize(size + 1)}
							isLoading={isLoading}
						/>
					</div>
				)}
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
