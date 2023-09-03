'use client'
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react'
import {
	MarketCapBucketLabel,
	TYPE_GROUPS,
	TypeGroupLabel,
} from '../lib/MARKET_CAP_BUCKETS'
import { DEFAULT_MARKET_CAP_LABEL, DEFAULT_TYPE_GROUP_LABELS } from '../page'

export const FilterContext = createContext<{
	marketCapKey: MarketCapBucketLabel
	setMarketCapKey: Dispatch<SetStateAction<MarketCapBucketLabel>>
	typeLabels: (typeof TYPE_GROUPS)[number]['label'][]
	setTypeLabels: Dispatch<SetStateAction<TypeGroupLabel[]>>
}>({
	marketCapKey: DEFAULT_MARKET_CAP_LABEL,
	setMarketCapKey: () => {},
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
	const [typeLabels, setTypeLabels] = useState<TypeGroupLabel[]>(
		DEFAULT_TYPE_GROUP_LABELS,
	)

	return (
		<FilterContext.Provider
			value={{
				marketCapKey,
				setMarketCapKey,
				typeLabels,
				setTypeLabels,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
