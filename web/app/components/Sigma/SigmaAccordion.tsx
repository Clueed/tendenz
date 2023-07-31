'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PageOfSigmaCards } from './PageOfSigmaCards'

export function SigmaAccordion({ minMarketCap }: { minMarketCap: number }) {
	const [expandedKey, setExpandedKey] = useState<string>('')

	useEffect(() => {
		setExpandedKey('')
		setPageIndex(1)
	}, [minMarketCap])

	const [pageIndex, setPageIndex] = useState<number>(1)

	function handleNextPage() {
		const nextPage = pageIndex + 1
		setPageIndex(nextPage)
	}

	const pages = []
	for (let i = 0; i < pageIndex; i++) {
		pages.push(
			<PageOfSigmaCards
				key={i}
				page={i}
				minMarketCap={minMarketCap}
				expandedKey={expandedKey}
				last={i === pageIndex - 1}
				handleNextPage={handleNextPage}
			/>,
		)
	}

	return (
		<Accordion.Root
			collapsible
			type="single"
			onValueChange={o => setExpandedKey(o)}
		>
			<AnimatePresence initial={false}>{pages}</AnimatePresence>
		</Accordion.Root>
	)
}
