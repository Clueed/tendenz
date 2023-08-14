import Link from 'next/link'
import ChevronRight from '../components/Sigma/ChevronRight'

export default function Docs() {
	return (
		<div className="grid grid-cols-default gap-y-[5vh] lg:grid-cols-[1fr_min(30rem,_90vw)_1fr]">
			<MainDocsLink
				href="/docs/statistical-significants"
				text={'statistical significants'}
			/>
			<MainDocsLink href="/docs/market-cap" text={'market capitalization'} />
		</div>
	)
}

function MainDocsLink({ href, text }: { href: string; text: string }) {
	return (
		<Link
			href={href}
			className="group col-start-2 flex items-baseline justify-between rounded-lg bg-slate-a3 px-10 py-8 text-4xl text-slate-12 transition-all duration-1000 @container hover:bg-gradient-to-br hover:from-sky-a4 hover:to-indigo-a5 hover:shadow-xl"
		>
			<div>{text}</div>
			<div className="px-5 transition-all duration-1000 group-hover:pr-3 @lg:px-10">
				<ChevronRight height="0.5em" strokeWidth={1} />
			</div>
		</Link>
	)
}
