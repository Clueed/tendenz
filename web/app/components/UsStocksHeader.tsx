'use client'
import {
	DEFAULT_MARKET_CAP_LABEL,
	DEFAULT_TYPE_GROUP_LABELS,
	MARKET_CAP_BUCKETS,
} from '../lib/MARKET_CAP_BUCKETS'
import { useSigmaYesterday } from '../lib/api/clientApi'
import { npl } from '../lib/naturalLanguageProcessing'

import Timer from './Timer'

export default function UsStocksHeader({}: {}) {
	const minMarketCap = MARKET_CAP_BUCKETS.filter(
		bucket => bucket.label === DEFAULT_MARKET_CAP_LABEL,
	)[0].minMarketCap

	const { data } = useSigmaYesterday({
		minMarketCap,
		typeGroups: DEFAULT_TYPE_GROUP_LABELS,
	})

	const lastDate = data?.[0] ? npl(data[0].last.date as string) : 'yesterday'

	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 mb-[1.5vh] flex items-end justify-between gap-5">
				<h2 className="text-4xl font-normal text-indigo-11">
					{lastDate}
					&apos;s anomalies
				</h2>

				<Timer />
			</div>
		</div>
	)
}
