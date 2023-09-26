import { useLoadingAnimation } from '@/app/lib/hooks/useLoadingAnimation'
import { Icon } from '@tendenz/icons'
import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { FreeFloatButton } from '../FreeFloatButton'

export function NextPageButton({
	ref,
	...props
}: DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) {
	const { loadingAnimation } = useLoadingAnimation()

	return (
		<motion.div
			whileInView={{
				y: [0, 15, 0],
				transition: {
					delay: 10,
					repeat: Infinity,
					repeatDelay: 10,
				},
			}}
			className="my-10 flex items-center justify-center"
		>
			<FreeFloatButton
				{...props}
				aria-label="load more"
				className="text-2xl"
				disabled={loadingAnimation}
			>
				<Icon name="radix-icons/chevron-down" />
			</FreeFloatButton>
		</motion.div>
	)
}
