'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
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

	const { data, size, setSize, isLoadingMore, error, flatData, isReachingEnd } =
		useSigmaYesterdayInfinite()

	return (
		<div className="grid h-[60rem] grid-cols-default items-start">
			<div
				className={clsx(
					'relative col-span-full col-start-1 sm:col-span-1 sm:col-start-2',
				)}
			>
				<SigmaTableLoadingOverlay />
				<div className="max-h-[55rem] min-h-[30rem] w-full overflow-y-auto overflow-x-hidden">
					{error && <ErrorBar />}
					<SigmaAccordionRoot onValueChange={setExpandedKey}>
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
						<NextPageButton onClick={() => setSize(size + 1)} />
					)}
				</div>
			</div>
		</div>
	)
}

const ErrorBar = () => (
	<div className="flex items-center justify-center gap-2 bg-redA3 px-2 py-2 text-sm text-red12">
		<Icon name="phosphor-icons/fire" />
		something went wrong...
	</div>
)
