'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Icon } from '@tendenz/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy, useState } from 'react'
import { FreeFloatButton } from '../FreeFloatButton'
import { Ball } from '../LoadingsBalls'

const SettingsPage = lazy(() => import('../../settings/page'))

export default function SettingsButton({}: {}) {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<FreeFloatButton className="group">
					<Icon
						name="radix-icons/gear"
						className="transition-transform duration-1000 ease-spring will-change-transform group-hover:rotate-[180deg] "
					/>
				</FreeFloatButton>
			</Dialog.Trigger>

			<AnimatePresence>
				{open && (
					<Dialog.Portal forceMount>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Dialog.Overlay className="fixed inset-0 bg-slateA5 backdrop-blur-md dark:bg-slate1/70">
								<div className="mask-linear-radial absolute inset-0 -z-20 bg-slate1 opacity-75" />
								<div className="noise-bg absolute bottom-1/2 right-1/2 -z-10 h-screen w-screen translate-x-1/2 translate-y-1/2 opacity-50 dark:opacity-25" />
							</Dialog.Overlay>
							<Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 focus:outline-none">
								<Dialog.Title className="m-0 font-medium text-slate11">
									Settings
								</Dialog.Title>

								<Suspense fallback={<LoadingsBalls />}>
									<SettingsPage />
								</Suspense>
								<Dialog.Close asChild>
									<button
										className="absolute right-0 top-0 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
										aria-label="Close"
									>
										x
									</button>
								</Dialog.Close>
							</Dialog.Content>
						</motion.div>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	)
}

const colors = [
	'bg-skyA6',
	'bg-mintA6',
	'bg-indigoA8',
	'bg-violetA8',
	'bg-plumA8',
	'bg-irisA8',
	'bg-purpleA8',
	'bg-blueA8',
	'bg-cyanA8',
	'bg-pinkA8',
]

const LoadingsBalls = () => (
	<div className="flex h-24 items-center justify-center">
		<Ball className="translate-x-0" colorClassNameList={colors} />
		<Ball className="translate-x-10" colorClassNameList={colors} />
		<Ball className="-translate-x-10" colorClassNameList={colors} />
	</div>
)
