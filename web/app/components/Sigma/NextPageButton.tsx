import clsx from 'clsx'
import { HTMLMotionProps, motion } from 'framer-motion'

export function NextPageButton(props: HTMLMotionProps<'button'>) {
	return (
		<motion.button
			{...props}
			whileInView={{
				y: [0, 15, 0],
				transition: {
					delay: 10,
					repeat: Infinity,
					repeatDelay: 10,
				},
			}}
			aria-label="load more"
			className={clsx(
				'rounded-md bg-slate-a3 p-3 text-slate-12 transition-all duration-500 enabled:hover:bg-slate-a10 enabled:hover:text-slate-1 enabled:hover:shadow-md',
			)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512"
				fill="currentColor"
			>
				Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
				License - https://fontawesome.com/license (Commercial License) Copyright
				2023 Fonticons, Inc.{' '}
				<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
			</svg>
		</motion.button>
	)
}
