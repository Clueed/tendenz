'use client'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

const colors = {
	indigo: {
		popclsx: 'bg-gradient-to-br from-indigo-11 to-indigo-12',
		arrowclsx: 'fill-indigo-11',
		contentclsx: 'text-indigo-1',
	},
	slate: {
		popclsx: 'bg-gradient-to-br from-slate-11 to-slate-12',
		arrowclsx: 'fill-slate-11',
		contentclsx: 'text-slate-1',
	},
} as const

export default function Pop({
	children,
	popoverContent,
	popoverColor,
	offset,
	rootClassName,
}: {
	children:
		| ReactNode
		| ReactNode[]
		| ((open: boolean) => ReactNode | ReactNode[])
	popoverContent: ReactNode | ReactNode[]
	popoverColor: keyof typeof colors
	popoverContainerclsx?: string
	offset: number
	rootClassName?: string
}) {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Popover.Root onOpenChange={o => setOpen(o)} open={open}>
			<Popover.Trigger
				onClick={e => {
					setOpen(!open)
					e.preventDefault()
				}}
				className={clsx('group appearance-none leading-none', rootClassName)}
			>
				{typeof children === 'function' ? children(open) : children}
			</Popover.Trigger>

			<AnimatePresence>
				{open && (
					<Popover.Portal forceMount>
						<Popover.Content
							forceMount
							sideOffset={offset}
							avoidCollisions
							collisionPadding={10}
						>
							<motion.div
								initial={{ y: '-5%', opacity: 0 }}
								animate={{
									y: '0',
									opacity: 1,
									transition: { type: 'spring', duration: 0.5 },
								}}
								exit={{ y: '-10%', opacity: 0 }}
								className={clsx(
									'z-50 rounded-lg',
									colors[popoverColor].popclsx,
								)}
							>
								<div className="noise-bg absolute inset-0 -z-10 rounded-lg opacity-40 dark:opacity-75" />
								<div
									className={clsx(
										'rounded-lg px-5 py-4',
										colors[popoverColor].contentclsx,
									)}
								>
									{popoverContent}
								</div>
								<Popover.Arrow
									className={clsx(colors[popoverColor].arrowclsx)}
								/>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	)
}
