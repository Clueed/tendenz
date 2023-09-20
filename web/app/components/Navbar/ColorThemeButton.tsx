'use client'

import clsx from 'clsx'
import { AnimatePresence, motion, useAnimate, usePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ButtonHTMLAttributes, useEffect, useState } from 'react'

export default function ColorThemeButton({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// theme is undefined server-side, so only show when mounted
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}
	return (
		<button
			className={clsx(
				'relative aspect-square h-[1rem] text-slate10 duration-1000 will-change-auto hover:text-slate12',
				className,
			)}
			onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
			aria-label={
				theme === 'light' ? 'switch to dark mode' : 'switch to light mode'
			}
			{...props}
		>
			<AnimatePresence mode="wait">
				{theme === 'light' ? <SunIcon key={1} /> : <MoonIcon key={2} />}
			</AnimatePresence>
		</button>
	)
}

const sunPathVariants = {
	show: { scale: 1, pathLength: 1 },
	hide: { scale: 0, pathLength: 0 },
}

const otherVariants = {
	show: {
		pathLength: 1,
	},
	hide: { pathLength: 0 },
}

const SunIcon = () => {
	const [isPresent, safeToRemove] = usePresence()
	const [scope, animate] = useAnimate()

	useEffect(() => {
		if (isPresent) {
			const enterAnimation = async () => {
				await animate('circle', otherVariants.show)
				await animate('path', sunPathVariants.show)
			}
			enterAnimation()
		} else {
			const exitAnimation = async () => {
				await animate('path', sunPathVariants.hide)
				await animate('circle', otherVariants.hide)
				safeToRemove()
			}

			exitAnimation()
		}
	}, [isPresent])

	return (
		<motion.svg
			ref={scope}
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			fill="none"
			initial="hidden"
			animate="visible"
			exit="hidden"
			className="absolute left-0 top-0 "
			viewBox="0 0 256 256"
		>
			<motion.path
				initial={sunPathVariants.hide}
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={16}
				d="M128 40V16"
			/>
			<motion.circle
				initial={otherVariants.hide}
				cx={128}
				cy={128}
				r={56}
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={16}
			/>
			<motion.path
				initial={sunPathVariants.hide}
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={16}
				d="M64 64 48 48M64 192l-16 16M192 64l16-16M192 192l16 16M40 128H16M128 216v24M216 128h24"
			/>
		</motion.svg>
	)
}

const MoonIcon = () => (
	<motion.svg
		xmlns="http://www.w3.org/2000/svg"
		width="1rem"
		height="1rem"
		fill="none"
		exit="hidden"
		className="absolute left-0 top-0 "
		viewBox="0 0 256 256"
	>
		<motion.path
			initial={otherVariants.hide}
			animate={otherVariants.show}
			exit={otherVariants.hide}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={16}
			d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11Z"
		/>
	</motion.svg>
)
