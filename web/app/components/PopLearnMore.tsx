import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import Link from 'next/link'

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
					' -mr-1 mt-2 flex items-center gap-1 rounded-md px-3 py-1 text-sm transition-all  hover:shadow-xl',
					colors[color].button,
				)}
			>
				learn more <Icon name="radix-icons/chevron-right" />
			</div>
		</Link>
	)
}
