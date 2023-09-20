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
				'rounded-md bg-slateA3 leading-none text-slateA11 transition-colors duration-500 hover:bg-slateA4',
				aspectRatio === 'square' ? 'px-1.5 py-1.5' : '',
				className,
			)}
		>
			{props.children}
		</button>
	)
}
