import clsx from 'clsx'
import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	ForwardedRef,
	forwardRef,
} from 'react'

export const FreeFloatButton = forwardRef(function PopoverContent(
	{
		className,
		...props
	}: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>,
	forwardedRef: ForwardedRef<HTMLButtonElement>,
) {
	return (
		<button
			{...props}
			ref={forwardedRef}
			className={clsx(
				'rounded-md bg-slateA1 px-[0.375em] py-[0.375em] leading-none text-slateA11 transition-colors duration-500 enabled:hover:bg-slateA4',
				className,
			)}
		>
			{props.children}
		</button>
	)
})
