import clsx from 'clsx'

export default function FreeFloatButton({
	className,
	aspectRatio = 'square',
	...props
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & { aspectRatio?: 'rect' | 'square' }) {
	return (
		<button
			{...props}
			className={clsx(
				'rounded-md bg-slateA1 leading-none text-slateA11 transition-colors duration-500 enabled:hover:bg-slateA4',
				aspectRatio === 'square' ? 'px-[0.375em] py-[0.375em]' : '',
				className,
			)}
		>
			{props.children}
		</button>
	)
}
