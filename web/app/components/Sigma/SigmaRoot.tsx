'use client'
import { MARKET_CAP_BUCKETS, TYPE_GROUPS } from '@/app/lib/MARKET_CAP_BUCKETS'
import { useContext } from 'react'
import { FilterContext } from '../FilterContextProvider'
import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapQuestionMark'
import { SigmaAccordion } from './SigmaAccordion'
import StockTypeToggle from './StockTypeToggle'

export default function SigmaRoot({}: {}) {
	const { marketCapKey, setMarketCapKey, typeLabels, setTypeLabels } =
		useContext(FilterContext)

	return (
		<>
			<div className="mb-[2vh] mt-[1vh] grid grid-cols-default">
				<div className="col-start-2 mb-2 flex flex-wrap items-end justify-between align-bottom">
					<StockTypeToggle
						selectedKeys={typeLabels}
						selectKeys={setTypeLabels}
						allKeys={TYPE_GROUPS.map(group => group.label)}
					/>

					<MarketCapFilter
						selectedKey={marketCapKey}
						selectKey={setMarketCapKey}
						allKeys={MARKET_CAP_BUCKETS.map(bucket => bucket.label)}
					/>
				</div>
				<div className="col-start-2 flex items-start justify-between align-top">
					<h3 className="text-sm leading-none text-slate-11">United States</h3>
					<MarketCapFilterLabel />
				</div>
			</div>

			<SigmaAccordion />
		</>
	)
}
