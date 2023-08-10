import * as motion from '@/app/lib/motionWrapper'

export function ComingSoon() {
	const items = [
		'options',
		'global equities',
		'commodities',
		'foreign exchange',
		'equity indexes',
		'bonds',
		'cryptocurrencies',
		'notes',
		'derivatives',
		'interest rates',
		'economic indicators',
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
			<div className="col-start-2">
				<motion.h2
					variants={container}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mb-16 text-center text-4xl font-normal text-indigo-12 sm:mb-20 sm:text-5xl"
				>
					{'coming soon...'.split('').map((c, i) => {
						return (
							<motion.span key={i} variants={child}>
								{c === ' ' ? '\u00A0' : c}
							</motion.span>
						)
					})}
				</motion.h2>
				<motion.div className="flex animate-text-gradient-15s flex-wrap justify-around gap-x-4 gap-y-6 bg-gradient-to-r from-sky-11 via-violet-11 to-sky-11 bg-[200%_auto] bg-clip-text text-2xl text-black-a1 sm:gap-x-10 sm:gap-y-[5vh] sm:text-4xl">
					<motion.animatePresence>
						{items.map((v, ii) => {
							return (
								<motion.div
									key={v}
									variants={container}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									transition={{ delay: 1 }}
								>
									{v.split('').map((c, i) => {
										return (
											<motion.span key={ii + i} variants={child}>
												{c === ' ' ? '\u00A0' : c}
											</motion.span>
										)
									})}
								</motion.div>
							)
						})}
					</motion.animatePresence>
				</motion.div>
			</div>
		</div>
	)
}
