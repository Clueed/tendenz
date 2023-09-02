'use client'
import {
	MARKET_CAP_BUCKETS,
	MarketCapBucketLabel,
	TYPE_GROUPS,
	TypeGroupLabel,
} from '@/app/lib/MARKET_CAP_BUCKETS'
import { stockTypeCode } from '@tendenz/types'
import { useState } from 'react'
import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapQuestionMark'
import { SigmaAccordion } from './SigmaAccordion'

export default function SigmaRoot({
	marketCapBuckets,
	title,
	typeGroups,
}: {
	marketCapBuckets: typeof MARKET_CAP_BUCKETS
	title: string
	typeGroups: typeof TYPE_GROUPS
}) {
	const defaultKey: MarketCapBucketLabel = '1b'
	const [bucketKey, setBucketKey] = useState<MarketCapBucketLabel>(defaultKey)
	const minMarketCap = marketCapBuckets.filter(
		bucket => bucket.label === bucketKey,
	)[0].minMarketCap

	const defaultTypeGroup: TypeGroupLabel = 'stocks'
	const [typeGroupKey, setTypeGroupKey] =
		useState<TypeGroupLabel>(defaultTypeGroup)
	const types = typeGroups.filter(group => group.label === typeGroupKey)[0]
		.types as stockTypeCode[]

	return (
		<>
			<div className="mb-[2vh] mt-[10vh] grid grid-cols-default">
				<div className="col-start-2 mb-2 flex items-end justify-between align-bottom">
					<h3 className="text-3xl font-normal leading-none text-slate-12">
						{title}
					</h3>
					<div className="flex gap-1">
						<MarketCapFilter
							selectedKey={bucketKey}
							selectKey={setBucketKey}
							allKeys={marketCapBuckets.map(bucket => bucket.label)}
						/>
						<MarketCapFilter
							selectedKey={typeGroupKey}
							selectKey={setTypeGroupKey}
							allKeys={typeGroups.map(group => group.label)}
						/>
					</div>
				</div>
				<div className="col-start-2 flex items-start justify-between align-top">
					<h3 className="text-base leading-none text-slate-11">
						United States
					</h3>
					<MarketCapFilterLabel />
				</div>
			</div>

			<SigmaAccordion minMarketCap={minMarketCap} stockTypes={types} />
		</>
	)
}
