import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy, useState } from 'react'
import { GearIcon } from './icons/GearIcon'

const SettingsPage = lazy(() => import('../settings/page'))

export default function SettingsButton({}: {}) {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button
					className={clsx(
						'rounded-md stroke-2 px-2 py-2 text-sm transition-all',
						'bg-slate-a2 text-slate-a11 duration-500 hover:bg-slate-a4 hover:shadow-lg group-hover:bg-slate-a4',
					)}
				>
					<GearIcon className="transition-transform duration-1000 ease-linear  hover:rotate-[360deg]" />
				</button>
			</Dialog.Trigger>

			<AnimatePresence>
				{open && (
					<Dialog.Portal forceMount>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Dialog.Overlay className="fixed inset-0 bg-slate-a5 backdrop-blur-md dark:bg-slate-1">
								<div className="mask-linear-radial absolute inset-0 -z-20 bg-slate-1 opacity-75" />
								<div className="noise-bg absolute bottom-1/2 right-1/2 -z-10 h-screen w-screen translate-x-1/2 translate-y-1/2 opacity-50 dark:opacity-25" />
							</Dialog.Overlay>
							<Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 focus:outline-none">
								<Dialog.Title className="m-0 text-[17px] font-medium text-slate-11">
									Settings
								</Dialog.Title>

								<Suspense fallback={<Loading />}>
									<SettingsPage />
								</Suspense>
								<Dialog.Close asChild>
									<button
										className="absolute right-0 top-0 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet-11 hover:bg-violet-4 focus:shadow-[0_0_0_2px] focus:shadow-violet-7 focus:outline-none"
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

const Loading = () => (
	<div className="flex h-24 items-center justify-center">
		<LoadingBalls className="translate-x-0" />
		<LoadingBalls className="translate-x-10" />
		<LoadingBalls className="-translate-x-10" />
	</div>
)

const LoadingBalls = ({ className }: { className?: string }) => {
	const xKeyFrames = Array.from(
		{ length: 5 },
		() => Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1) + '%',
	)
	const yKeyFrames = Array.from(
		{ length: 5 },
		() => Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1) + '%',
	)

	const colors = [
		'bg-sky-a6',
		'bg-mint-a6',
		'bg-indigo-a8',
		'bg-violet-a8',
		'bg-plum-a8',
		'bg-iris-a8',
		'bg-purple-a8',
		'bg-blue-a8',
		'bg-cyan-a8',
		'bg-pink-a8',
	]
	const randomColorIndex = Math.floor(Math.random() * (colors.length - 1))
	const color = colors[randomColorIndex]

	return (
		<div className={clsx(className, 'absolute')}>
			<motion.div
				animate={{
					x: ['0%', ...xKeyFrames, '0%'],
					y: ['0%', ...yKeyFrames, '0%'],
					transition: {
						repeat: Infinity,
						duration: 20,
						ease: 'linear',
					},
				}}
				className={clsx(
					'aspect-square w-20 transform-gpu rounded-full blur-lg',
					color,
				)}
			/>
		</div>
	)
}
