import { MARKET_CAP_BUCKETS } from '@/app/lib/MARKET_CAP_BUCKETS'
import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../FilterContextProvider'
import { PageOfSigmaCards } from './PageOfSigmaCards'

export function SigmaAccordion({}: {}) {
	const { marketCapKey, typeLabels } = useContext(FilterContext)

	const minMarketCap = MARKET_CAP_BUCKETS.filter(
		bucket => bucket.label === marketCapKey,
	)[0].minMarketCap

	const [expandedKey, setExpandedKey] = useState<string>('')
	useEffect(() => {
		setExpandedKey('')
		setPageIndex(1)
	}, [minMarketCap, typeLabels])

	const [pageIndex, setPageIndex] = useState<number>(0)

	function handleNextPage() {
		const nextPage = pageIndex + 1
		setPageIndex(nextPage)
	}

	const pages = []
	for (let i = 0; i < pageIndex; i++) {
		pages.push(
			<PageOfSigmaCards
				page={i}
				key={i}
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
			className="overflow-hidden"
		>
			<AnimatePresence initial={false}>{pages}</AnimatePresence>
		</Accordion.Root>
	)
}
