'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ForwardedRef, forwardRef } from 'react'

export const HeroPopTrigger = forwardRef(function HeroPopTrigger(
	{
		children,
		className,
		arrowClassName,
		...props
	}: PopoverPrimitive.PopoverTriggerProps & { arrowClassName?: string },
	forwardedRef: ForwardedRef<HTMLButtonElement>,
) {
	return (
		<PopoverPrimitive.Trigger
			{...props}
			ref={forwardedRef}
			className="border-b-2 border-slateA7 transition-colors duration-500 will-change-[color,_backgroundColor] hover:border-slateA9 hover:text-slateA12 data-[state=open]:border-indigoA8 data-[state=open]:text-indigo12"
		>
			{children}
		</PopoverPrimitive.Trigger>
	)
})
