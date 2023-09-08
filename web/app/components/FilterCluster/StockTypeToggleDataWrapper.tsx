'use client'
import { useContext } from 'react'
import { TYPE_GROUPS } from '../../lib/MARKET_CAP_BUCKETS'
import { FilterContext } from '../FilterContextProvider'
import StockTypeToggle from './StockTypeToggle'

export default function StockTypeToggleDataWrapper({}: {}) {
	const { typeLabels, setTypeLabels } = useContext(FilterContext)
	return (
		<StockTypeToggle
			selectedKeys={typeLabels}
			selectKeys={setTypeLabels}
			allKeys={TYPE_GROUPS.map(group => group.label)}
		/>
	)
}
