import { Balancer } from 'react-wrap-balancer'
import { ComingSoonHighlight } from './ComingSoonHighlight'

export function ComingSoon() {
	return (
		<div className="grid grid-cols-default sm:text-center">
			<div className="col-start-2">
				<h2 className="text-2xl text-slateA10 sm:text-3xl">coming soon...</h2>
			</div>

			{content.map(({ head, subtitle }, i) => (
				<div className="col-start-2" key={i}>
					<h3 className="mt-12 text-4xl leading-10 text-slateA12 sm:mt-20 sm:text-5xl">
						<Balancer>{head}</Balancer>
					</h3>
					<p className="mt-4 text-lg text-slate11 sm:text-2xl">
						<Balancer>{subtitle}</Balancer>
					</p>
				</div>
			))}
		</div>
	)
}

const content = [
	{
		head: (
			<>
				navigate
				<ComingSoonHighlight color="blue">market</ComingSoonHighlight>
				dynamics
			</>
		),
		subtitle:
			'explore financial assets across derivatives, foreign exchange, commodities, and indexes',
	},
	{
		head: (
			<>
				discover{' '}
				<ComingSoonHighlight color="violet">trends</ComingSoonHighlight>
			</>
		),
		subtitle:
			'spot changes over time by comparing with weekly and monthly data',
	},
	{
		head: (
			<>
				stay ahead of{' '}
				<ComingSoonHighlight color="sky">regional</ComingSoonHighlight>
				shifts
			</>
		),
		subtitle:
			'unravel the changing landscapes of europe, asia, south america, and the middle east',
	},
]
