import clsx from 'clsx'

export const Highlight = ({
	className,
	sizeClassName = '-inset-x-8 inset-y-0',
}: {
	className?: string
	sizeClassName?: string
}) => (
	<div
		className={clsx(
			'absolute -z-10 transform-gpu rounded-full blur-xl will-change-[opacity]',
			sizeClassName,
			className,
		)}
	/>
)
