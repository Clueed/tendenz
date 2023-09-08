'use client'
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react'
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

export const FilterContext = createContext<{
	marketCap: MarketCapFilter
	setMarketCap: Dispatch<SetStateAction<MarketCapFilter>>
	typeLabels: (typeof TYPE_GROUPS)[number]['label'][]
	setTypeLabels: Dispatch<SetStateAction<TypeGroupLabel[]>>
}>({
	marketCap: DEFAULT_MARKET_CAP,
	setMarketCap: () => {},
	typeLabels: DEFAULT_TYPE_GROUP_LABELS,
	setTypeLabels: () => {},
})

export default function FilterContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [marketCap, setMarketCap] =
		useState<MarketCapFilter>(DEFAULT_MARKET_CAP)
	const [typeLabels, setTypeLabels] = useState<TypeGroupLabel[]>(
		DEFAULT_TYPE_GROUP_LABELS,
	)

	return (
		<FilterContext.Provider
			value={{
				marketCap,
				setMarketCap,
				typeLabels,
				setTypeLabels,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
