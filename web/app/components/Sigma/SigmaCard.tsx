import { CardBackground } from '@/components/sigma/CardBackground'
import { SigmaCardBody } from '@/components/sigma/SigmaCardBody'
import { SigmaCardHeader } from '@/components/sigma/SigmaCardHeader'
import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence, motion } from 'framer-motion'

export function SigmaCard({ expanded }: { expanded: boolean }) {
	return (
		<div className="group/card relative mb-2 py-3 @container">
			<CardBackground expanded={expanded} />

			<Accordion.Trigger asChild>
				<SigmaCardHeader expanded={expanded} />
			</Accordion.Trigger>

			<AnimatePresence presenceAffectsLayout>
				{expanded && (
					<Accordion.Content asChild forceMount>
						<motion.div
							initial={{
								height: 0,
								opacity: 0,
							}}
							animate={{
								height: 'auto',
								opacity: 1,
							}}
							exit={{
								height: 0,
								opacity: 0,
							}}
							transition={{
								ease: 'easeInOut',
								duration: 0.5,
							}}
							className={'overflow-hidden'}
						>
							<SigmaCardBody />
						</motion.div>
					</Accordion.Content>
				)}
			</AnimatePresence>
		</div>
	)
}
