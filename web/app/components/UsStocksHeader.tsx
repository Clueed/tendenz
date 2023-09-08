'use client'
import { useContext } from 'react'
import { useSigmaYesterday } from '../lib/api/clientApi'
import { npl } from '../lib/naturalLanguageProcessing'
import { FilterContext } from './FilterContextProvider'

import Timer from './Timer'

export default function UsStocksHeader({}: {}) {
	const { typeLabels, marketCap } = useContext(FilterContext)
	const { data } = useSigmaYesterday({ typeLabels, marketCap })

	const lastDate = data?.[0] ? npl(data[0].last.date as string) : 'yesterday'

	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 mb-[1.5vh] flex items-end justify-between gap-5">
				<h2 className="text-4xl font-normal text-slate-11">
					{lastDate}
					&apos;s anomalies
				</h2>

				<Timer />
			</div>
		</div>
	)
}
