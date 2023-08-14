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
			className="group col-span-full flex items-center justify-between bg-gradient-to-br from-slate-a2 to-slate-a3 px-10 py-8 text-3xl text-slate-12 transition-all duration-1000 @container hover:from-sky-a4 hover:to-indigo-a5 hover:shadow-xl sm:col-span-1 sm:col-start-2 sm:rounded-lg"
		>
			<div>{text}</div>
			<div className="px-0 transition-all duration-1000 group-hover:translate-x-3 @lg:px-10">
				<ChevronRight height="0.5em" strokeWidth={1} />
			</div>
		</Link>
	)
}
