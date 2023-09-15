'use client'
import { TYPE_GROUPS } from '../../lib/CONSTANS'
import { useFilterStore } from '../../lib/stores/filterStore'
import StockTypeToggle from './StockTypeToggle'

export default function StockTypeToggleDataWrapper({}: {}) {
	const setTypeLabels = useFilterStore(state => state.setTypeLabels)
	const typeLabels = useFilterStore(state => state.typeLabels)
	return (
		<StockTypeToggle
			selectedKeys={typeLabels}
			selectKeys={setTypeLabels}
			allKeys={TYPE_GROUPS.map(group => group.label)}
		/>
	)
}
