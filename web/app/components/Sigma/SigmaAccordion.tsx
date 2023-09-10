'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
import * as Accordion from '@radix-ui/react-accordion'
import { PAGE_SIZE, tendenzApiSigmaYesterday } from '@tendenz/types'
import clsx from 'clsx'
import { AnimatePresence, Variants } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { NextPageButton } from './NextPageButton'
import { SigmaCard } from './SigmaCard'

export function SigmaAccordion({}: {}) {
	const [expandedKey, setExpandedKey] = useState<string>('')

	const { data, mutate, size, setSize, isValidating, isLoading } =
		useSigmaYesterdayInfinite()

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

	useEffect(() => {
		isLoadingMore && setLoadingAnimation(true)
	}, [setLoadingAnimation, isLoadingMore])

	const handleAnimationIteration = () => {
		!isLoadingMore && setLoadingAnimation(false)
	}

	return (
		<div className="grid-cols-default sm:grid">
			<div
				className={clsx(
					'relative col-start-2 -mx-2 box-border h-[50rem] overflow-x-hidden overflow-y-scroll px-2 py-2 transition-all duration-1000 sm:rounded-2xl',
					size > 1 && 'bg-slate-a2',
					loadingAnimation && 'animate-pulse bg-slate-a2',
				)}
				onAnimationIteration={handleAnimationIteration}
			>
				<Accordion.Root
					collapsible
					type="single"
					onValueChange={o => setExpandedKey(o)}
					className=""
				>
					{
						//isLoadingMore && 'isloading more'
					}
					<AnimatePresence initial={false} mode="popLayout">
						{data &&
							cards.map(card => (
								<SigmaCard
									key={card.ticker}
									entry={card}
									expanded={expandedKey === card.ticker}
									onAnimationIteration={() => {}}
									className={clsx(false && 'animate-pulse')}
								/>
							))}
					</AnimatePresence>
				</Accordion.Root>
				<div className="my-10">
					<NextPageButton
						handleNextPage={() => setSize(size + 1)}
						isLoading={isLoading}
					/>
				</div>
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
