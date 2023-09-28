import clsx from 'clsx'
import { useContext } from 'react'
import { SigmaEntryContext } from './SigmaEntryContext'

export const CardBackground = ({ expanded }: { expanded: boolean }) => {
	const { sigma } = useContext(SigmaEntryContext)

	const positive = sigma > 0
	return (
		<div
			className={clsx('absolute inset-0 -z-10 transition-all sm:rounded-xl', {
				'group-hover/card:bg-slateA3': !expanded,
				'bg-gradient-to-br from-limeA3 to-tealA4': expanded && positive,
				'bg-gradient-to-br from-orangeA3 to-purpleA4': expanded && !positive,
			})}
		/>
	)
}
