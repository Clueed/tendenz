import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { DEFAULT_OFFRAMP_NAME, OFFRAMP_NAMES } from '../lib/MARKET_CAP_BUCKETS'

interface FilterState {
	offrampName: (typeof OFFRAMP_NAMES)[number]
	setOfframpName: (newOfframpName: (typeof OFFRAMP_NAMES)[number]) => void
}

export const useSettingsStore = create<FilterState>()(
	devtools(
		// persist(
		set => ({
			offrampName: DEFAULT_OFFRAMP_NAME,
			setOfframpName: newOfframpName => set({ offrampName: newOfframpName }),
		}),
		{
			name: 'SettingsStore',
		},
		// ),
	),
)
