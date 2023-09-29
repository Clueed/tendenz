import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import Link from 'next/link'

const colors = {
	indigo: {
		button: 'text-indigo4 hover:bg-indigoA6 bg-indigoA3',
	},
	slate: {
		button: 'text-slate4 hover:bg-slateA10 bg-slateA3',
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
