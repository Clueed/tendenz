import clsx from 'clsx'
import { ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'

export function ComingSoon() {
	const content = [
		{
			head: (
				<>
					navigate
					<Highlight color="blue">market</Highlight>
					dynamics
				</>
			),
			subtitle:
				'explore financial assets across derivatives, foreign exchange, commodities, and indexes',
		},
		{
			head: (
				<>
					discover <Highlight color="violet">trends</Highlight>
				</>
			),
			subtitle:
				'spot changes over time by comparing with weekly and monthly data',
		},
		{
			head: (
				<>
					stay ahead of <Highlight color="sky">regional</Highlight>
					shifts
				</>
			),

			subtitle:
				'unravel the changing landscapes of europe, asia, south america, and the middle east',
		},
	]

	return (
		<div className="grid grid-cols-default sm:text-center">
			<div className="col-start-2">
				<h2 className="text-2xl text-slate-a10 sm:text-3xl">coming soon...</h2>
			</div>

			{content.map(({ head, subtitle }, i) => (
				<div className="col-start-2" key={i}>
					<h3 className="mt-12 text-4xl leading-10 text-slate-a12 sm:mt-20 sm:text-5xl">
						<Balancer>{head}</Balancer>
					</h3>
					<p className="mt-4 text-lg text-slate-11 sm:text-2xl">
						<Balancer>{subtitle}</Balancer>
					</p>
				</div>
			))}
		</div>
	)
}

const colors = {
	sky: { text: 'text-sky-11', bg: 'bg-sky-a4' },
	violet: { text: 'text-violet-11', bg: 'bg-violet-a5' },
	blue: { text: 'text-blue-11', bg: 'bg-blue-a5' },
} as const

const Highlight = ({
	children,
	color,
}: {
	children: ReactNode
	color: keyof typeof colors
}) => {
	return (
		<>
			{' '}
			<span className={clsx('relative', colors[color].text)}>
				<div
					className={clsx(
						'absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full blur-xl',
						colors[color].bg,
					)}
				/>
				{children}
			</span>{' '}
		</>
	)
}
