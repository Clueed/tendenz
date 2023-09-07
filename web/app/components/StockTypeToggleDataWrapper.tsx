'use client'
import { useContext } from 'react'
import { TYPE_GROUPS } from '../lib/MARKET_CAP_BUCKETS'
import { FilterContext } from './FilterContextProvider'
import StockTypeToggle from './Sigma/StockTypeToggle'

export default function StockTypeToggleDataWrapper({}: {}) {
	const { typeLabels, setTypeLabels } = useContext(FilterContext)
	return (
		<div>
			<StockTypeToggle
				selectedKeys={typeLabels}
				selectKeys={setTypeLabels}
				allKeys={TYPE_GROUPS.map(group => group.label)}
			/>
			<h3>
				<span className="text-xs uppercase tracking-wider text-indigo-12">
					assets types
				</span>{' '}
				<span className="text-xs leading-none text-slate-11">
					United States
				</span>
			</h3>
		</div>
	)
}
