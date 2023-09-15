import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Suspense, lazy, useState } from 'react'

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						fill="currentColor"
						className="transition-transform duration-1000 ease-[cubic-bezier(0,-0.91,1,1.73)] hover:rotate-[360deg]"
					>
						! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com
						License - https://fontawesome.com/license (Commercial License)
						Copyright 2023 Fonticons, Inc.{' '}
						<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
					</svg>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-slate-a5   backdrop-blur-md dark:bg-slate-1">
					<div className="mask-linear-radial absolute inset-0 -z-20 bg-slate-1 opacity-75" />
					<div className="noise-bg absolute bottom-1/2 right-1/2 -z-10 h-screen w-screen translate-x-1/2 translate-y-1/2 opacity-50 dark:opacity-25" />
				</Dialog.Overlay>
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[6px] p-[25px] focus:outline-none">
					<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
						Settings
					</Dialog.Title>
					{/* <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-mauve-11">
						Make changes to your profile here. Click save when you're done.
					</Dialog.Description> */}

					<Suspense fallback={<Loading />}>{open && <SettingsPage />}</Suspense>
					{/* <div className="mt-[25px] flex justify-end">
						<Dialog.Close asChild>
							<button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-4 px-[15px] font-medium leading-none text-green-11 hover:bg-green-5 focus:shadow-[0_0_0_2px] focus:shadow-green-7 focus:outline-none">
								Save changes
							</button>
						</Dialog.Close>
					</div> */}
					<Dialog.Close asChild>
						<button
							className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet-11 hover:bg-violet-4 focus:shadow-[0_0_0_2px] focus:shadow-violet-7 focus:outline-none"
							aria-label="Close"
						>
							x
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

const Loading = () => (
	<div className="flex h-24 items-center justify-center">
		<LoadingBalls className="translate-x-0" />
		<LoadingBalls className="translate-x-5" />
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
						//delay: 10,
						repeat: Infinity,
						//repeatDelay: 10,
						duration: 20,
						ease: 'linear',
						//type: 'inertia',
						//velocity: 50,
						//type: 'inertia',

						//type: 'spring',
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
