'use client'
import * as motion from '@/app/lib/motionWrapper'
import classNames from 'classnames'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Balancer } from 'react-wrap-balancer'

const items = [
	'options',
	'global equities',
	'commodities',
	'foreign exchange',
	'indexes',
	'bonds',
	'cryptocurrencies',
	'notes',
	'derivatives',
	'interest rates',
]

export function ComingSoon() {
	return (
		<div className="grid grid-cols-default lg:text-center">
			<div className="col-start-2 text-4xl text-slate-a10">coming soon...</div>
			<div className="col-start-2 mt-12">
				<h2 className="text-5xl">
					<div className="text-slate-12">
						aggregate across <br />
					</div>

					<RotatingText items={items} className="h-[3rem] text-violet-11" />
				</h2>

				<div className="mt-4 text-xl text-slate-11 sm:text-2xl">
					<p>
						<Balancer>
							Our method can seamlessly encompass a variety of markets
							delivering only key movements at a glance.
						</Balancer>
					</p>
				</div>
			</div>
			<div className="col-start-2 mt-24">
				<h2 className="text-5xl text-slate-a12">
					discover{' '}
					<span className="relative text-sky-11">
						{' '}
						<div className="absolute -inset-x-8 inset-y-0 -z-10 rounded-full bg-sky-a5 blur-xl" />
						trends
					</span>
				</h2>
				<div className="mt-4 text-xl text-slate-11 sm:text-2xl">
					<p>
						<Balancer>
							Spot changes over time by comparing with weekly and monthly data.
						</Balancer>
					</p>
				</div>
			</div>
		</div>
	)
}

function RotatingText({
	items,
	className,
}: {
	items: string[]
	className?: string
}) {
	const [index, setIndex] = useState(0)

	const ref = useRef(null)
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
					className="absolute inset-0 lg:text-center"
				>
					<span className="relative">
						<div className="absolute -inset-x-8 inset-y-0 -z-10 rounded-full bg-violet-a6 blur-xl" />
						{items[index]}
					</span>
				</motion.div>
			</motion.animatePresence>
		</div>
	)
}
