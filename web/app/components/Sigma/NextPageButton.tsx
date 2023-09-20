import { Icon } from '@tendenz/icons'
import { motion } from 'framer-motion'
import { FreeFloatButton } from '../FreeFloatButton'

export function NextPageButton(
	props: React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>,
) {
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
			<FreeFloatButton {...props} aria-label="load more" className="text-2xl">
				<Icon name="radix-icons/chevron-down" />
			</FreeFloatButton>
		</motion.div>
	)
}
