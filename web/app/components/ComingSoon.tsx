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
			<div className="col-start-2 my-10 text-center text-5xl text-slate-a10">
				coming soon...
			</div>
			<div className="col-start-2 flex flex-wrap items-start gap-5">
				<div className="flex-shrink-0 flex-grow basis-72">
					<h2 className="w-full">
						<div className="text-right text-4xl">
							aggregate across <br />
						</div>

						<Test01
							items={items}
							className="right-0 h-[2.5rem] w-full text-right text-4xl text-violet-11"
						/>
					</h2>
				</div>
				<div className="basis-80 text-lg">
					<p>
						Our method can seamlessly encompass a variety of markets delivering
						only key movements at a glance.
					</p>
				</div>
			</div>
			<div className="col-start-2 mt-10 flex flex-wrap items-start gap-5">
				<div className="basis-80 text-lg">
					<p>
						Spot changes over time by comparing with weekly and monthly data.
					</p>
				</div>
				<div className="flex-shrink-0 flex-grow basis-72">
					<h2 className="w-full">
						<div className="text-left text-5xl text-sky-11">trends</div>
					</h2>
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
					className="absolute right-0"
				>
					{items[index]}
				</motion.div>
			</motion.animatePresence>
		</div>
	)
}
