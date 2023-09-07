'use client'
import classNames from 'classnames'
import MarketCapFilter from './Sigma/MarketCapFilter'
import MarketCapFilterLabel from './Sigma/MarketCapFilterLabel'

type Props = {}

export default function MarketCapCluster({}: Props) {
	return (
		<div className={classNames('h-full')}>
			<MarketCapFilter />
			<MarketCapFilterLabel />
		</div>
	)
}
