import { Balancer } from 'react-wrap-balancer'

const items = [
	'indexes',
	'bonds',
	'cryptocurrencies',
	'notes',
	'interest rates',
]

export function ComingSoon() {
	return (
		<div className="grid grid-cols-default lg:text-center">
			<div className="col-start-2 mb-6 text-3xl text-slate-a10">
				coming soon...
			</div>
			<div className="col-start-2">
				<h2 className="text-4xl text-slate-12 sm:text-5xl">
					<Balancer>
						navigate
						<span className="relative text-violet-11">
							{' '}
							<div className="absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full bg-violet-a5 blur-xl" />
							market{' '}
						</span>
						dynamics
					</Balancer>
				</h2>

				<div className="mt-4 text-lg text-slate-11 sm:text-2xl">
					<p>
						<Balancer>
							seamlessly explore financial assets across foreign exchange,
							derivatives, commodities, and indexes
						</Balancer>
					</p>
				</div>
			</div>
			<div className="col-start-2 mt-12 sm:mt-24">
				<h2 className="text-4xl text-slate-a12 sm:text-5xl">
					discover{' '}
					<span className="relative text-indigo-11">
						{' '}
						<div className="absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full bg-indigo-a5 blur-xl" />
						trends
					</span>
				</h2>
				<div className="mt-4 text-lg text-slate-11 sm:text-2xl">
					<p>
						<Balancer>
							spot changes over time by comparing with weekly and monthly data
						</Balancer>
					</p>
				</div>
			</div>
			<div className="col-start-2 mt-12 sm:mt-24">
				<h2 className="text-4xl text-slate-a12 sm:text-5xl">
					<Balancer>
						stay ahead of{' '}
						<span className="relative text-sky-11">
							<div className="absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full bg-sky-a5 blur-xl" />
							regional
						</span>{' '}
						shifts
					</Balancer>
				</h2>
				<div className="mt-4 text-lg text-slate-11 sm:text-2xl">
					<p>
						<Balancer>
							unravel the changing landscapes of europe, asia, south america,
							and the middle east
						</Balancer>
					</p>
				</div>
			</div>
		</div>
	)
}
