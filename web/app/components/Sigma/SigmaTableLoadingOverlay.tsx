'use client'
import { useSigmaYesterdayInfinite } from '@/app/lib/api/clientApi'
import { useLoadingAnimation } from '@/app/lib/hooks/useLoadingAnimation'
import clsx from 'clsx'

export function SigmaTableLoadingOverlay({}: {}) {
	const { loadingAnimation, handleAnimationIteration } = useLoadingAnimation()
	const { size, error } = useSigmaYesterdayInfinite()

	const pulsingStripe = (
		<div
			className={clsx(
				'h-[1px] rounded-full bg-gradient-to-r from-transparent via-slateA10 to-transparent transition-all',
				loadingAnimation && 'animate-border-width',
			)}
			onAnimationIteration={handleAnimationIteration}
		/>
	)

	return (
		<div
			className={clsx(
				'absolute -inset-2 -z-10 flex flex-col items-center justify-between transition-colors duration-1000 sm:rounded-2xl',
				size > 1 && 'bg-slateA2',
				error && 'bg-tomatoA3',
				loadingAnimation && 'bg-slateA3',
			)}
		>
			{pulsingStripe}
			{pulsingStripe}
		</div>
	)
}
