'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ForwardedRef, forwardRef } from 'react'

export const TagPopoverTrigger = forwardRef(function TagPopoverTrigger(
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
			className="inline rounded-md bg-slateA3 px-2 py-1.5 align-middle text-[0.6em] leading-none tracking-widest text-slate11 data-[state=open]:bg-slateA9 data-[state=open]:text-slate1"
		>
			{children}
		</PopoverPrimitive.Trigger>
	)
})
