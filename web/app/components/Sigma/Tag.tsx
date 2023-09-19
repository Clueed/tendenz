import clsx from 'clsx'
import { ReactNode } from 'react'

export function Tag({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<>
			{' '}
			<span
				className={clsx(
					'rounded-md bg-slateA3 px-2 py-1 text-[0.6em] text-slate11',
					className,
				)}
			>
				{children}
			</span>
		</>
	)
}
