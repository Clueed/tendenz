'use client'
import clsx from 'clsx'
import { AnimationEventHandler } from 'react'

export function SigmaTableLoadingOverlay({
	className,
	onAnimationIteration,
	loadingAnimation,
}: {
	className: string
	onAnimationIteration: AnimationEventHandler<HTMLDivElement>
	loadingAnimation: boolean
}) {
	const pulsingStripe = (
		<div
			className={clsx(
				'h-[1px] rounded-full bg-gradient-to-r from-transparent via-slateA10 to-transparent transition-all',
				loadingAnimation && 'animate-border-width',
			)}
			onAnimationIteration={onAnimationIteration}
		/>
	)

	return (
		<div
			className={clsx(
				'absolute -inset-0 -z-10 flex flex-col items-center justify-between ',
				className,
			)}
		>
			{pulsingStripe}
			{pulsingStripe}
		</div>
	)
}
