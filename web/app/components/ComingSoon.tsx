'use client'
import * as motion from '@/app/lib/motionWrapper'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

export function ComingSoon() {
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

	const container = {
		hidden: { opacity: 0 },
		visible:
			//i = Math.ceil(Math.random() * 50) / 25) =>

			{
				opacity: 1,
				transition: { staggerChildren: 0.05, delayChildren: 0.1 },
			},
	}

	const child = {
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			x: -20,
			y: 10,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	}

	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 my-5 text-4xl text-slate-a10">
				coming soon...
			</div>
			<div className="col-start-2">
				<h2 className="text-5xl">
					<div className="text-slate-12">
						aggregate across <br />
					</div>

					<Test01 items={items} className="h-[3rem] text-violet-11" />
				</h2>

				<div className="mt-2 text-2xl text-slate-11">
					<p>
						Our method can seamlessly encompass a variety of markets delivering
						only key movements at a glance.
					</p>
				</div>
			</div>
			<div className="col-start-2 mt-16">
				<h2 className="text-5xl text-slate-a12">
					discover{' '}
					<span className="relative text-sky-11">
						{' '}
						<div className="absolute -inset-x-8 inset-y-0 -z-10 rounded-full bg-sky-a5 blur-xl" />
						trends
					</span>
				</h2>
				<div className="mt-2 text-2xl text-slate-11">
					<p>
						Spot changes over time by comparing with weekly and monthly data.
					</p>
				</div>
			</div>
		</div>
	)
}

const Test01 = ({
	items,
	className,
}: {
	items: string[]
	className?: string
}) => {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const id = setInterval(() => {
			setIndex(state => {
				if (state >= items.length - 1) return 0
				return state + 1
			})
		}, 3000)
		return () => clearInterval(id)
	}, [])

	return (
		<div className={classNames('relative', className)}>
			<motion.animatePresence>
				<motion.div
					key={items[index]}
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: -20, opacity: 0 }}
					transition={{ ease: 'easeInOut' }}
					className="absolute"
				>
					<div className="absolute -inset-x-8 inset-y-0 -z-10 rounded-full bg-violet-a6 blur-xl" />
					{items[index]}
				</motion.div>
			</motion.animatePresence>
		</div>
	)
}
