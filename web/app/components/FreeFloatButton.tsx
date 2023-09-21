import clsx from 'clsx'
import { forwardRef } from 'react'

export const FreeFloatButton = forwardRef<
	HTMLButtonElement,
	JSX.IntrinsicElements['button']
>(function PopoverContent({ className, children, ...props }, forwardedRef?) {
	return (
		<button
			{...props}
			ref={forwardedRef}
			className={clsx(
				'rounded-md bg-slateA1 px-[0.375em] py-[0.375em] leading-none text-slateA11 transition-colors duration-500 enabled:hover:bg-slateA4',
				className,
			)}
		>
			{children}
		</button>
	)
})
