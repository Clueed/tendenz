'use client'

import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../FilterContextProvider'
import { PageOfSigmaCards } from './PageOfSigmaCards'

export function SigmaAccordion({}: {}) {
	const { marketCap, typeLabels } = useContext(FilterContext)
	useEffect(() => {
		setExpandedKey('')
		setPageIndex(1)
	}, [marketCap, typeLabels])

	const [expandedKey, setExpandedKey] = useState<string>('')

	const [pageIndex, setPageIndex] = useState<number>(1)
	function handleNextPage() {
		const nextPage = pageIndex + 1
		setPageIndex(nextPage)
	}

	const pages = [...Array(pageIndex).keys()].map(key => (
		<PageOfSigmaCards
			page={key}
			key={key}
			expandedKey={expandedKey}
			last={key === pageIndex - 1}
			handleNextPage={handleNextPage}
		/>
	))

	console.log('pages :>> ', [...Array(pageIndex).keys()])
	console.log('pageIndex :>> ', pageIndex)

	return (
		<div className="grid-cols-default sm:grid">
			<div
				className={classNames(
					'col-start-2 -mx-2 box-border h-[50rem] overflow-x-hidden overflow-y-scroll px-2 py-2 transition-all duration-1000 sm:rounded-2xl',
					{
						'bg-gradient-to-b from-slate-a2 via-transparent to-slate-a2':
							pageIndex > 1,
					},
				)}
			>
				<Accordion.Root
					collapsible
					type="single"
					onValueChange={o => setExpandedKey(o)}
					className=""
				>
					<AnimatePresence initial={false}>{pages}</AnimatePresence>
				</Accordion.Root>
			</div>
		</div>
	)
}
