'use client'

import { useLoadingAnimation } from '@/app/lib/hooks/useLoadingAnimation'
import { useSigmaYesterdayInfinite } from '@/app/lib/hooks/useSigmaYesterdayInfinite'
import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import { useState } from 'react'
import { NextPageButton } from './NextPageButton'
import { SigmaAccordionItem } from './SigmaAccordionItem'
import { SigmaAccordionRoot } from './SigmaAccordionRoot'
import { SigmaCard } from './SigmaCard'
import { SigmaEntryContext } from './SigmaEntryContext'
import { SigmaTableLoadingOverlay } from './SigmaTableLoadingOverlay'

export function SigmaTable() {
	const [expandedKey, setExpandedKey] = useState<string>('')

	const { data, size, setSize, error, flatData, isReachingEnd } =
		useSigmaYesterdayInfinite()

	const { loadingAnimation, handleAnimationIteration } = useLoadingAnimation()

	console.log('error :>> ', error)

	return (
		<div className="grid h-[60rem] grid-cols-default items-start">
			<div
				className={clsx(
					'relative col-span-full col-start-1 sm:col-span-1 sm:col-start-2',
					'-m-2 overflow-clip transition-colors duration-1000 sm:rounded-2xl',
					size > 1 && 'bg-slateA2',
					error && 'bg-tomatoA3',
					loadingAnimation && 'bg-slateA3',
				)}
			>
				{error && <ErrorBar />}
				<SigmaTableLoadingOverlay
					className="sm:rounded-2xl"
					loadingAnimation={loadingAnimation}
					onAnimationIteration={handleAnimationIteration}
				/>
				<div className="max-h-[55rem] min-h-[30rem] w-full overflow-y-auto overflow-x-hidden sm:rounded-2xl">
					<SigmaAccordionRoot onValueChange={setExpandedKey} className="p-2">
						{data &&
							flatData.map(card => (
								<SigmaAccordionItem value={card.ticker} key={card.ticker}>
									<SigmaEntryContext.Provider value={card}>
										<SigmaCard expanded={expandedKey === card.ticker} />
									</SigmaEntryContext.Provider>
								</SigmaAccordionItem>
							))}
					</SigmaAccordionRoot>
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

const ErrorBar = () => (
	<div className="flex items-center justify-center gap-2 bg-redA3 p-2 text-sm font-light text-red12 sm:rounded-t-2xl">
		<Icon name="phosphor-icons/fire" />
		something went wrong...
	</div>
)
