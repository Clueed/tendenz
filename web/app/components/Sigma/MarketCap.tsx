'use client'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { getMarketCapCategory } from '../../misc/getMarketCapCategory'

export function MarketCap({
	marketCap,
	className,
	expandDirection = 'right',
}: {
	marketCap: number
	expandDirection?: 'right' | 'left'
	className?: string
}) {
	const [expanded, setExpanded] = useState<Boolean>(false)
	const label = getMarketCapCategory(marketCap)
	const formattedMarketCap = marketCap > 1e6 ? label + '+' : '>' + label

	return (
		<>
			<motion.div
				layout="preserve-aspect"
				className={classNames(
					'inline-flex flex-wrap items-center gap-x-2 leading-none',
					className,
				)}
				onClick={event => {
					event?.preventDefault()
					setExpanded(!expanded)
				}}
			>
				<motion.div
					layout="preserve-aspect"
					className={classNames('text-xs', {
						'text-slate-12': expanded,
						'text-slate-11': !expanded,
						'order-2': expandDirection === 'left',
					})}
				>
					{formattedMarketCap}
				</motion.div>
				<AnimatePresence mode="wait" presenceAffectsLayout>
					{expanded && (
						<motion.span
							layout="size"
							initial={{ width: 0 }}
							animate={{ width: 'auto' }}
							exit={{ width: 0 }}
							transition={{ duration: 1 }}
							className={classNames(
								'line-clamp-1 truncate text-[0.6rem] text-slate-a11',
								{ 'order-1': expandDirection === 'left' },
							)}
						>
							market cap
						</motion.span>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	)
}
