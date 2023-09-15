import clsx from 'clsx'
import Link from 'next/link'
import ChevronRight from '../components/icons/ChevronRight'

export default function Docs() {
	return (
		<div className="flex flex-col gap-[3vh]">
			<MainDocsLink
				href="/docs/statistical-significants"
				text={'statistical significants'}
			/>
			<MainDocsLink href="/docs/market-cap" text={'market capitalization'} />
		</div>
	)
}

function MainDocsLink({ href, text }: { href: string; text: string }) {
	const bgClassName =
		'absolute inset-0 -z-10 col-span-1 -mx-8 px-8 transition-all duration-1000 sm:col-start-2 sm:rounded-lg bg-gradient-to-br'

	return (
		<Link
			href={href}
			className="group relative grid grid-cols-default gap-y-[5vh] @container sm:grid-cols-[1fr_min(30rem,_90vw)_1fr] "
		>
			<div
				className={clsx(
					bgClassName,
					'from-slate-a1 to-slate-a3',
					'group-hover:opacity-0',
				)}
			/>
			<div
				className={clsx(
					bgClassName,
					'from-sky-a4 to-indigo-a5 shadow-xl',
					'opacity-0 group-hover:opacity-100',
				)}
			/>
			<div className="col-start-2 flex items-center justify-between py-8 text-3xl text-slate-12">
				<div>{text}</div>
				<div className="transition-all duration-1000 group-hover:translate-x-3">
					<ChevronRight height="0.5em" strokeWidth={1} />
				</div>
			</div>
		</Link>
	)
}
