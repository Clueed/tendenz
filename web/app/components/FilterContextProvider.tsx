'use client'
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react'
import {
	DEFAULT_MIN_MARKETCAP,
	DEFAULT_TYPE_GROUP_LABELS,
	TYPE_GROUPS,
	TypeGroupLabel,
} from '../lib/MARKET_CAP_BUCKETS'

export const FilterContext = createContext<{
	minMarketCap: number
	setMinMarketCap: Dispatch<SetStateAction<number>>
	typeLabels: (typeof TYPE_GROUPS)[number]['label'][]
	setTypeLabels: Dispatch<SetStateAction<TypeGroupLabel[]>>
}>({
	minMarketCap: DEFAULT_MIN_MARKETCAP,
	setMinMarketCap: () => {},
	typeLabels: DEFAULT_TYPE_GROUP_LABELS,
	setTypeLabels: () => {},
})

export default function FilterContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [minMarketCap, setMinMarketCap] = useState<number>(
		DEFAULT_MIN_MARKETCAP,
	)
	const [typeLabels, setTypeLabels] = useState<TypeGroupLabel[]>(
		DEFAULT_TYPE_GROUP_LABELS,
	)

	return (
		<FilterContext.Provider
			value={{
				minMarketCap,
				setMinMarketCap,
				typeLabels,
				setTypeLabels,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
