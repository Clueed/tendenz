import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { tendenzApiSigmaYesterday } from '../../lib/api/sharedApi'
import { SigmaCardBody } from './SigmaCardBody'
import { SigmaCardHeader } from './SigmaCardHeader'

export default function SigmaCard({
	entry,
	expanded,
}: {
	entry: tendenzApiSigmaYesterday
	expanded: boolean
}) {
	return (
		<Accordion.Item
			value={entry.ticker}
			className="group relative mb-2 grid grid-cols-default py-3"
		>
			<div
				className={classNames(
					'absolute right-0 top-0 -z-10 col-span-full h-full w-full transition-all sm:col-start-2 sm:col-end-2 sm:rounded-xl',
					{
						'group-hover:bg-slate-a3': !expanded,
					},
					{ 'bg-gradient-to-br from-sky-a4 to-indigo-a5 shadow': expanded },
				)}
			/>
			<div className="col-start-2 col-end-2 @container">
				<Accordion.Trigger className="w-full">
					<SigmaCardHeader
						expanded={expanded}
						name={entry.name!}
						sigma={entry.sigma}
						marketCap={entry.marketCap}
						ticker={entry.ticker}
					/>
				</Accordion.Trigger>
			</div>
			<div className="col-span-2 col-start-2 @container sm:col-span-1 sm:col-start-2">
				<AnimatePresence presenceAffectsLayout>
					{expanded && (
						<Accordion.Content asChild forceMount>
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{
									height: 'auto',
									opacity: 1,
								}}
								exit={{ height: 0, opacity: 0 }}
								transition={{
									ease: 'easeInOut',
									duration: 0.5,
								}}
								className={'overflow-hidden'}
							>
								<SigmaCardBody
									last={entry.last}
									secondLast={entry.secondLast}
									ticker={entry.ticker}
								/>
							</motion.div>
						</Accordion.Content>
					)}
				</AnimatePresence>
			</div>
		</Accordion.Item>
	)
}
