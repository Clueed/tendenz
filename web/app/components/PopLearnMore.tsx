import clsx from 'clsx'
import Link from 'next/link'
import ChevronRight from './icons/ChevronRight'

const colors = {
	indigo: {
		button: 'text-indigo-4 hover:bg-indigo-a6 bg-indigo-a3',
	},
	slate: {
		button: 'text-slate-4 hover:bg-slate-a10 bg-slate-a3',
	},
} as const

export function PopLearnMore({
	href,
	color,
}: {
	href: string
	color: keyof typeof colors
}) {
	return (
		<Link href={href}>
			<div
				className={clsx(
					'-mb-1 -mr-1 mt-2 flex items-center gap-2 rounded-md  px-3 py-1 text-sm transition-all  hover:shadow-xl',
					colors[color].button,
				)}
			>
				learn more{' '}
				<span className="mt-[0.175rem]">
					<ChevronRight strokeWidth={15} height="0.6rem" />
				</span>
			</div>
		</Link>
	)
}
