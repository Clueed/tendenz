'use client'
import * as motion from '@/app/lib/motionWrapper'
import classNames from 'classnames'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function RotatingText({
	items,
	className,
}: {
	items: string[]
	className?: string
}) {
	const [index, setIndex] = useState(0)

	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref)

	useEffect(() => {
		if (!isInView) {
			return
		}
		const id = setInterval(() => {
			setIndex(state => {
				if (state >= items.length - 1) return 0
				return state + 1
			})
		}, 2000)
		return () => clearInterval(id)
	}, [isInView, items.length])

	return (
		<div className={classNames('relative', className)} ref={ref}>
			<motion.animatePresence>
				<motion.div
					key={items[index]}
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: -20, opacity: 0 }}
					transition={{ ease: 'easeInOut' }}
					className="absolute inset-0 sm:text-center"
				>
					<span className="relative">
						<div className="absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full bg-violet-a6 blur-xl" />
						{items[index]}
					</span>
				</motion.div>
			</motion.animatePresence>
		</div>
	)
}
