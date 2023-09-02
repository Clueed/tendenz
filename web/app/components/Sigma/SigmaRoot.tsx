'use client'
import { MARKET_CAP_BUCKETS } from '@/app/lib/MARKET_CAP_BUCKETS'
import { stockTypeCode } from '@tendenz/types'
import { useState } from 'react'
import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapQuestionMark'
import { SigmaAccordion } from './SigmaAccordion'

type MarketCapBucketLabel = (typeof MARKET_CAP_BUCKETS)[number]['label']

export default function SigmaRoot({
	marketCapBuckets,
	title,
	stockTypes,
}: {
	marketCapBuckets: typeof MARKET_CAP_BUCKETS
	title: string
	stockTypes?: stockTypeCode[]
}) {
	const defaultKey: MarketCapBucketLabel = '1b'
	const [bucketKey, setBucketKey] = useState<MarketCapBucketLabel>(defaultKey)
	const minMarketCap = marketCapBuckets.filter(
		bucket => bucket.label === bucketKey,
	)[0].minMarketCap
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
					</div>
				</div>
				<div className="col-start-2 flex items-start justify-between align-top">
					<h3 className="text-base leading-none text-slate-11">
						United States
					</h3>
					<MarketCapFilterLabel />
				</div>
			</div>

			<SigmaAccordion minMarketCap={minMarketCap} stockTypes={stockTypes} />
		</>
	)
}
