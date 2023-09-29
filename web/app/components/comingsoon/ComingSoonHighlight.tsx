import clsx from 'clsx'
import { ReactNode } from 'react'
import { Highlight } from '../Highlight'

const colors = {
	sky: { text: 'text-sky11', bg: 'bg-skyA4' },
	violet: { text: 'text-violet11', bg: 'bg-violetA5' },
	blue: { text: 'text-blue11', bg: 'bg-blueA5' },
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
