import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DEFAULT_OFFRAMP_NAME, OFFRAMP_NAMES } from '../CONSTANS'

interface FilterState {
	persist: boolean
	setPersist: (bool: boolean) => void
	offRampName: (typeof OFFRAMP_NAMES)[number]
	setOffRampName: (newOffRampName: (typeof OFFRAMP_NAMES)[number]) => void
}

export const useSettingsStore = create<FilterState>()(
	devtools(
		persist(
			set => ({
				persist: false,
				setPersist: bool => set({ persist: bool }),
				offRampName: DEFAULT_OFFRAMP_NAME,
				setOffRampName: newOffRampName => set({ offRampName: newOffRampName }),
			}),
			{
				name: 'SettingsStore',
				partialize: state => (state.persist === true ? state : undefined),
			},
		),
	),
)
