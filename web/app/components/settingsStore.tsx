import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { DEFAULT_OFFRAMP_NAME, OFFRAMP_NAMES } from '../lib/MARKET_CAP_BUCKETS'

interface FilterState {
	offRampName: (typeof OFFRAMP_NAMES)[number]
	setOffRampName: (newOffRampName: (typeof OFFRAMP_NAMES)[number]) => void
}

export const useSettingsStore = create<FilterState>()(
	devtools(
		// persist(
		set => ({
			offRampName: DEFAULT_OFFRAMP_NAME,
			setOffRampName: newOffRampName => set({ offRampName: newOffRampName }),
		}),
		{
			name: 'SettingsStore',
		},
		// ),
	),
)
