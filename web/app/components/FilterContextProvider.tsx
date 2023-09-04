'use client'
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react'
import {
	DEFAULT_MARKET_CAP_LABEL,
	DEFAULT_MIN_MARKETCAP,
	DEFAULT_TYPE_GROUP_LABELS,
	MarketCapBucketLabel,
	TYPE_GROUPS,
	TypeGroupLabel,
} from '../lib/MARKET_CAP_BUCKETS'

export const FilterContext = createContext<{
	marketCapKey: MarketCapBucketLabel
	setMarketCapKey: Dispatch<SetStateAction<MarketCapBucketLabel>>
	minMarketCap: number
	setMinMarketCap: Dispatch<SetStateAction<number>>
	typeLabels: (typeof TYPE_GROUPS)[number]['label'][]
	setTypeLabels: Dispatch<SetStateAction<TypeGroupLabel[]>>
}>({
	marketCapKey: DEFAULT_MARKET_CAP_LABEL,
	setMarketCapKey: () => {},
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
	const [marketCapKey, setMarketCapKey] = useState<MarketCapBucketLabel>(
		DEFAULT_MARKET_CAP_LABEL,
	)
	const [minMarketCap, setMinMarketCap] = useState<number>(
		DEFAULT_MIN_MARKETCAP,
	)
	const [typeLabels, setTypeLabels] = useState<TypeGroupLabel[]>(
		DEFAULT_TYPE_GROUP_LABELS,
	)

	return (
		<FilterContext.Provider
			value={{
				marketCapKey,
				setMarketCapKey,
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
