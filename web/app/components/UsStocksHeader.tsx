'use client'
import { useSigmaYesterday } from '../lib/api/clientApi'
import { npl } from '../lib/naturalLanguageProcessing'
import Timer from './Timer'

type Props = {}

export default function UsStocksHeader({}: Props) {
	const { data } = useSigmaYesterday(0)
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
