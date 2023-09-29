'use client'

import { useSigmaYesterdayInfinite } from '@/app/lib/hooks/useSigmaYesterdayInfinite'
import { npl } from '@/app/lib/naturalLanguageProcessing'
import clsx from 'clsx'

export function UsStocksHeaderTitle({ className }: { className?: string }) {
	const { flatData } = useSigmaYesterdayInfinite()
	const lastDate = flatData?.[0]
		? npl(flatData[0].last.date as string)
		: 'yesterday'
	return (
		<h2 className={clsx('text-4xl font-normal text-slate11', className)}>
			{lastDate}
			&apos;s anomalies
		</h2>
	)
}
