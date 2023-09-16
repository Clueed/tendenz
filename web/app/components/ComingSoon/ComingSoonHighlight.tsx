import clsx from 'clsx'
import { ReactNode } from 'react'
import { Highlight } from '../Highlight'

const colors = {
	sky: { text: 'text-sky-11', bg: 'bg-sky-a4' },
	violet: { text: 'text-violet-11', bg: 'bg-violet-a5' },
	blue: { text: 'text-blue-11', bg: 'bg-blue-a5' },
} as const
export const ComingSoonHighlight = ({
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
				<Highlight
					className={colors[color].bg}
					sizeClassName="-inset-x-10 -inset-y-5"
				/>
				{children}
			</span>{' '}
		</>
	)
}
