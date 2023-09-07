'use client'
import classNames from 'classnames'
import MarketCapFilter from './Sigma/MarketCapFilter'
import MarketCapFilterLabel from './Sigma/MarketCapFilterLabel'

export default function MarketCapCluster({}: {}) {
	return (
		<div className={classNames('h-full flex-grow')}>
			<MarketCapFilter />
			<MarketCapFilterLabel />
		</div>
	)
}
