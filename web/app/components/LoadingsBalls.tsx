import clsx from 'clsx'
import { motion } from 'framer-motion'

export const Ball = ({
	colorClassNameList,
	sizeClassName = 'w-20',
	className,
}: {
	colorClassNameList: string[]
	sizeClassName?: string
	className?: string
}) => {
	const xKeyFrames = Array.from(
		{
			length: 5,
		},
		() => Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1) + '%',
	)
	const yKeyFrames = Array.from(
		{
			length: 5,
		},
		() => Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1) + '%',
	)

	const randomColorIndex = Math.floor(
		Math.random() * (colorClassNameList.length - 1),
	)
	const color = colorClassNameList[randomColorIndex]

	const duration = 15 + Math.random() * 35

	return (
		<div className={clsx(className, 'absolute')}>
			<motion.div
				animate={{
					x: [...xKeyFrames],
					y: [...yKeyFrames],
					transition: {
						repeat: Infinity,
						duration,
						ease: 'linear',
						repeatType: 'reverse',
					},
				}}
				className={clsx(
					'aspect-square transform-gpu rounded-full blur-lg',
					color,
					sizeClassName,
				)}
			/>
		</div>
	)
}
