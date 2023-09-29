'use client'

import clsx from 'clsx'
import { AnimatePresence, motion, useAnimate, usePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'
import { FreeFloatButton } from '../FreeFloatButton'

export default function ColorThemeButton({
	className,
}: {
	className?: string
}) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// theme is undefined server-side, so only render when mounted
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<FreeFloatButton
			className={clsx('relative', className)}
			onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
			aria-label={
				theme === 'light' ? 'switch to dark mode' : 'switch to light mode'
			}
		>
			<AnimatePresence mode="wait">
				{theme === 'light' ? (
					<Aligner key={1}>
						<MoonIcon />
					</Aligner>
				) : (
					<Aligner key={2}>
						<SunIcon />
					</Aligner>
				)}
			</AnimatePresence>
		</FreeFloatButton>
	)
}

const Aligner = ({ children }: { children: ReactNode }) => (
	<div className="relative aspect-square h-[1em]">
		<div className="flex items-center justify-center">{children}</div>
	</div>
)

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
				await animate('circle', otherVariants.show, {
					duration: 0.5,
					type: 'spring',
				})
				await animate('path', sunPathVariants.show, {
					duration: 0.5,
					type: 'spring',
				})
			}
			enterAnimation()
		} else {
			const exitAnimation = async () => {
				await animate('path', sunPathVariants.hide, {
					duration: 0.5,
					type: 'spring',
				})
				await animate('circle', otherVariants.hide, {
					duration: 0.5,
					type: 'spring',
				})
				safeToRemove()
			}

			exitAnimation()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPresent])

	return (
		<motion.svg
			ref={scope}
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
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
		width="1em"
		height="1em"
		fill="none"
		exit="hidden"
		className="absolute left-0 top-0 "
		viewBox="0 0 256 256"
	>
		<motion.path
			initial={otherVariants.hide}
			animate={otherVariants.show}
			exit={otherVariants.hide}
			transition={{ duration: 1, type: 'spring', bounce: 0 }}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={16}
			d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11Z"
		/>
	</motion.svg>
)

// // Icons Licence
// MIT License

// Copyright (c) 2023 Phosphor Icons

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
