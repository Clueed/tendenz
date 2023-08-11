import { Balancer } from 'react-wrap-balancer'
import { RotatingText } from './RotatingText'

const items = [
	'options',
	'global equities',
	'commodities',
	'forex',
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
			<div className="col-start-2 text-3xl text-slate-a10">coming soon...</div>
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
