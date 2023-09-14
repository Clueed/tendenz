import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
	DEFAULT_MARKET_CAP,
	DEFAULT_TYPE_GROUP_LABELS,
	TYPE_GROUPS,
	TypeGroupLabel,
} from '../lib/MARKET_CAP_BUCKETS'

export type MarketCapFilter = {
	min: number
	max: number
}

interface FilterState {
	marketCap: MarketCapFilter
	setMarketCap: (newMarketCap: MarketCapFilter) => void
	typeLabels: (typeof TYPE_GROUPS)[number]['label'][]
	setTypeLabels: (newTypeGroups: TypeGroupLabel[]) => void
}

export const useFilterStore = create<FilterState>()(
	devtools(
		// persist(
		set => ({
			marketCap: DEFAULT_MARKET_CAP,
			setMarketCap: newMarketCap => set({ marketCap: newMarketCap }),
			typeLabels: DEFAULT_TYPE_GROUP_LABELS,
			setTypeLabels: newTypeGroups => set({ typeLabels: newTypeGroups }),
		}),
		{
			name: 'filterStore',
		},
		// ),
	),
)
