'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

export const PopRoot = PopoverPrimitive.Root
export const PopTrigger = PopoverPrimitive.Trigger

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

export const PopContent = forwardRef(function PopoverContent(
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
					'will-change-[transform,opacity] data-[state=closed]:data-[side=bottom]:animate-slideUpAndFadeOut data-[state=closed]:data-[side=left]:animate-slideRightAndFadeOut data-[state=closed]:data-[side=right]:animate-slideLeftAndFadeOut data-[state=closed]:data-[side=top]:animate-slideDownAndFadeOut data-[state=open]:data-[side=bottom]:animate-slideUpAndFadeIn data-[state=open]:data-[side=left]:animate-slideRightAndFadeIn data-[state=open]:data-[side=right]:animate-slideLeftAndFadeIn data-[state=open]:data-[side=top]:animate-slideDownAndFadeIn',
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
		widthClassName = 'w-64',
		...props
	}: PopoverPrimitive.PopoverContentProps & {
		color: keyof typeof colors
		widthClassName?: string
	},
	forwardedRef: ForwardedRef<HTMLDivElement>,
) {
	return (
		<PopContent
			ref={forwardedRef}
			arrowClassName={colors[color].arrowClassName}
			className={clsx(
				'rounded-lg bg-gradient-to-br px-5 py-4',
				colors[color].contentClassName,
				widthClassName,
			)}
			{...props}
		>
			<div className="noise-bg absolute inset-0 -z-10 rounded-lg opacity-30 dark:opacity-75" />
			{children}
		</PopContent>
	)
})
