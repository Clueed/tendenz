'use client'
import {
	MARKET_CAP_BUCKETS,
	MarketCapBucketLabel,
	TYPE_GROUPS,
	TypeGroupLabel,
} from '@/app/lib/MARKET_CAP_BUCKETS'
import { useState } from 'react'
import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapQuestionMark'
import { SigmaAccordion } from './SigmaAccordion'
import StockTypeToggle from './StockTypeToggle'

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

	const [selectedTypeLabels, setSelectedTypeLabels] = useState<
		TypeGroupLabel[]
	>(['stocks'] as TypeGroupLabel[])
	const types = selectedTypeLabels.flatMap(selectedLabel =>
		TYPE_GROUPS.filter(group => group.label === selectedLabel).flatMap(
			typeGroup => typeGroup.types,
		),
	)

	return (
		<>
			<div className="mb-[2vh] mt-[10vh] grid grid-cols-default">
				<div className="col-start-2 mb-2 flex items-end justify-between align-bottom">
					<StockTypeToggle
						selectedKeys={selectedTypeLabels}
						selectKeys={setSelectedTypeLabels}
						allKeys={typeGroups.map(group => group.label)}
					/>
					<div className="flex gap-1">
						<MarketCapFilter
							selectedKey={bucketKey}
							selectKey={setBucketKey}
							allKeys={marketCapBuckets.map(bucket => bucket.label)}
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
