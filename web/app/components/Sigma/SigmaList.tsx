'use client'

import { MARKET_CAP_BUCKETS } from '@/app/misc/MARKET_CAP_BUCKETS'
import { npl } from '@/app/misc/naturalLanguageProcessing'
import { useSigmaYesterday } from '@/app/misc/tendenzApi'
import { useState } from 'react'
import Timer from '../Timer'
import MarketCapFilter from './MarketCapFilter'
import { SigmaAccordion } from './SigmaAccordion'

type MarketCapBucketLabel = (typeof MARKET_CAP_BUCKETS)[number]['label']

export default function SigmaList({
	marketCapBuckets,
}: {
	marketCapBuckets: typeof MARKET_CAP_BUCKETS
}) {
	const defaultKey: MarketCapBucketLabel = '1b'
	const [bucketKey, setBucketKey] = useState<MarketCapBucketLabel>(defaultKey)
	const minMarketCap = marketCapBuckets.filter(
		bucket => bucket.label === bucketKey,
	)[0].minMarketCap

	const lastDate = useSigmaYesterday(minMarketCap, 0)?.data?.[0].last.date

	return (
		<div className="relative">
			<div className="my-[2.5vh] grid grid-cols-default">
				<div className="col-start-2 mb-[1.5vh] flex items-end justify-between gap-5">
					<h1 className="text-4xl font-normal text-indigo-11">
						{lastDate ? npl(lastDate) : 'yesterday'}
						&apos;s anomalies
					</h1>

					<Timer />
				</div>
				<div className="col-start-2 mb-2 flex items-end justify-between align-bottom">
					<h2 className="text-3xl font-normal leading-none text-slate-12">
						stocks
					</h2>
					<div>
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
					<div className="mr-1 text-xxs text-slate-a10">minimum market cap</div>
				</div>
			</div>

			<SigmaAccordion minMarketCap={minMarketCap} />
		</div>
	)
}
