import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

export const PopoverRoot = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

const colors = {
	indigo: {
		contentClassName: 'from-indigo11 to-indigo12 text-indigo1',
		arrowClassName: 'fill-indigo11',
	},
	slate: {
		contentClassName: 'from-slate11 to-slate12 text-slate1',
		arrowClassName: 'fill-slate11',
	},
} as const

export const PopoverContent = forwardRef(function PopoverContent(
	{
		children,
		className,
		arrowClassName,
		...props
	}: PopoverPrimitive.PopoverContentProps & { arrowClassName?: string },
	forwardedRef: ForwardedRef<HTMLDivElement>,
) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				{...props}
				ref={forwardedRef}
				sideOffset={5}
				avoidCollisions
				collisionPadding={30}
				className={clsx(
					'will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade',
					'z-50 rounded-lg',
					className,
				)}
			>
				{children}
				<PopoverPrimitive.Arrow className={arrowClassName} />
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	)
})

export const PopoverContentStyled = forwardRef(function PopoverContentStyled(
	{
		children,
		color,
		...props
	}: PopoverPrimitive.PopoverContentProps & { color: keyof typeof colors },
	forwardedRef: ForwardedRef<HTMLDivElement>,
) {
	return (
		<PopoverContent
			ref={forwardedRef}
			arrowClassName={colors[color].arrowClassName}
			className={clsx(
				'rounded-lg bg-gradient-to-br px-5 py-4',
				colors[color].contentClassName,
			)}
			{...props}
		>
			<div className="noise-bg absolute inset-0 -z-10 rounded-lg opacity-100 dark:opacity-75" />
			{children}
		</PopoverContent>
	)
})
