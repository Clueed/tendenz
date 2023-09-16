import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DEFAULT_OFFRAMP, OFFRAMPS } from '../CONSTANS'

interface FilterState {
	persist: boolean
	setPersist: (bool: boolean) => void
	offRampName: keyof typeof OFFRAMPS
	setOffRampName: (newOffRampName: keyof typeof OFFRAMPS) => void
}

export const useSettingsStore = create<FilterState>()(
	devtools(
		persist(
			set => ({
				persist: false,
				setPersist: bool => set({ persist: bool }),
				offRampName: DEFAULT_OFFRAMP,
				setOffRampName: newOffRampName => set({ offRampName: newOffRampName }),
			}),
			{
				name: 'SettingsStore',
				partialize: state => (state.persist === true ? state : undefined),
			},
		),
	),
)
