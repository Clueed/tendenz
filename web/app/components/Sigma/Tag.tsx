'use client'
import classNames from 'classnames'
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
				className={classNames(
					'rounded-md bg-slate-a3 px-2 py-1 text-[0.6em] text-slate-11',
					className,
				)}
			>
				{children}
			</span>
		</>
	)
}
