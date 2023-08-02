import * as Popover from '@radix-ui/react-popover'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const colors = {
	indigo: {
		popClassNames: 'bg-gradient-to-br from-indigo-11 to-indigo-12',
		arrowClassNames: 'fill-indigo-11',
		contentClassNames: 'text-indigo-1',
	},
	slate: {
		popClassNames: 'bg-gradient-to-br from-slate-11 to-slate-12',
		arrowClassNames: 'fill-slate-11',
		contentClassNames: 'text-slate-1',
	},
} as const

export default function Pop({
	children,
	popoverContent,
	popoverColor,
	offset,
}: {
	children: (open: boolean) => JSX.Element
	popoverContent: JSX.Element
	popoverColor: keyof typeof colors
	popoverContainerClassNames?: string
	offset: number
}) {
	const [open, setOpen] = useState<boolean>(false)

	type colors<K extends string | number | symbol> = {
		[k in K]: string
	}

	return (
		<Popover.Root onOpenChange={o => setOpen(o)} open={open}>
			<Popover.Trigger className="group/popover">
				{children(open)}
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
								className={classNames(
									'z-50 rounded-lg',
									colors[popoverColor].popClassNames,
								)}
							>
								<div className="noise2 absolute -z-10 h-full w-full rounded-lg opacity-30" />
								<div
									className={classNames(
										'rounded-lg px-5 py-4 text-slate-1 shadow-lg',
										colors[popoverColor].contentClassNames,
									)}
								>
									{popoverContent}
								</div>
								<Popover.Arrow
									className={classNames(
										colors[popoverColor].arrowClassNames,
										'drop-shadow-2xl',
									)}
								/>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	)
}
