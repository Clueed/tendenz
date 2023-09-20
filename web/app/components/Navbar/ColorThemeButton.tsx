'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ButtonHTMLAttributes, useEffect, useState } from 'react'

export default function ColorThemeButton({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}
	return (
		<button
			className={clsx(
				'relative aspect-square h-[1rem] text-slate10 will-change-auto hover:text-slate12',
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

const draw = {
	hidden: {
		pathLength: 0,
		fill: 'none',
		transition: {
			duration: 0.5,
		},
	},
	visible: {
		pathLength: 1,
		transition: {
			pathLength: { type: 'spring', duration: 2, bounce: 0 },
		},
	},
}

const SunIcon = () => (
	<motion.svg
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
		{/* <motion.path
			variants={draw}
			custom={0}
			fill="transparent"
			strokeWidth={0.75}
			stroke="currentColor"
			fillRule="evenodd"
			d="M7.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5ZM2.197 2.197a.5.5 0 0 1 .707 0L4.318 3.61a.5.5 0 0 1-.707.707L2.197 2.904a.5.5 0 0 1 0-.707ZM.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Zm1.697 5.803a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707l-1.414 1.414a.5.5 0 0 1-.707 0ZM12.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Zm-1.818-2.682a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707L11.39 4.318a.5.5 0 0 1-.707 0ZM8 12.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2Zm2.682-1.818a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 1 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707ZM5.5 7.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
			clipRule="evenodd"
		/> */}

		<motion.path
			variants={draw}
			custom={0}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={16}
			d="M128 40V16"
		/>
		<motion.circle
			variants={draw}
			custom={0}
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
			variants={draw}
			custom={0}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={16}
			d="M64 64 48 48M64 192l-16 16M192 64l16-16M192 192l16 16M40 128H16M128 216v24M216 128h24"
		/>
	</motion.svg>
)

const MoonIcon = () => (
	<motion.svg
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
			variants={draw}
			custom={0}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={16}
			d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11Z"
		/>
	</motion.svg>
)
