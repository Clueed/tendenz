import clsx from 'clsx'

export const Highlight = ({ className }: { className?: string }) => (
	<div
		className={clsx(
			'absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full blur-xl will-change-[opacity]',
			className,
		)}
	/>
)
