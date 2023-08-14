import Link from 'next/link'
import ChevronRight from '../components/Sigma/ChevronRight'

export default function Docs() {
	return (
		<div className="flex flex-col gap-[5vh]">
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
			className="group relative grid grid-cols-default gap-y-[5vh] @container sm:grid-cols-[1fr_min(30rem,_90vw)_1fr]"
		>
			<div className="absolute inset-0 -z-10 col-span-1 -mx-5 bg-gradient-to-br from-slate-a2 to-slate-a3 px-5 transition-all duration-1000 hover:from-sky-a4 hover:to-indigo-a5 hover:shadow-xl sm:col-start-2 sm:rounded-lg" />
			<div className="col-start-2 flex items-center justify-between py-8 text-3xl text-slate-12">
				<div>{text}</div>
				<div className="px-3 transition-all duration-1000 group-hover:translate-x-3">
					<ChevronRight height="0.5em" strokeWidth={1} />
				</div>
			</div>
		</Link>
	)
}
