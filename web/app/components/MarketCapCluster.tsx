'use client'
import classNames from 'classnames'
import MarketCapFilter from './Sigma/MarketCapFilter'
import MarketCapFilterLabel from './Sigma/MarketCapFilterLabel'

type Props = {}

export default function MarketCapCluster({}: Props) {
	return (
		<div
			className={classNames(
				'group/mc-cluster flex w-52 flex-col items-end gap-1 rounded-lg transition-colors delay-150 duration-500 ease-in',
			)}
		>
			<MarketCapFilterLabel />
			<MarketCapFilter />
		</div>
	)
}
