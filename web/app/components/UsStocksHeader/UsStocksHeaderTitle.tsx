'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/hooks/useSigmaYesterdayInfinite'
import { npl } from '@/app/lib/naturalLanguageProcessing'

export function UsStocksHeaderTitle() {
	const { data } = useSigmaYesterdayInfinite()
	const lastDate = data?.[0]?.[0]
		? npl(data[0][0].last.date as string)
		: 'yesterday'
	return (
		<h2 className="text-4xl font-normal text-slate11">
			{lastDate}
			&apos;s anomalies
		</h2>
	)
}
