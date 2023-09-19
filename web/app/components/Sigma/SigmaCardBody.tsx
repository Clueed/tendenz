import clsx from 'clsx'
import { useContext, useMemo } from 'react'
import { useOffRampUrl } from '../../lib/hooks/useOffRampUrl'
import { npl } from '../../lib/naturalLanguageProcessing'
import { useSettingsStore } from '../../lib/stores/settingsStore'
import { SigmaEntryContext } from './SigmaEntryContext'
import { YahooButton } from './YahooButton'

export function SigmaCardBody() {
	const entry = useContext(SigmaEntryContext)

	const { last, secondLast } = entry

	const formattedLastClose = '$' + last.close.toFixed(2)
	const formattedSecondLastClose = '$' + secondLast.close.toFixed(2)
	const dailyReturn = useMemo(
		() => (last.close / secondLast.close - 1) * 100,
		[secondLast.close, last.close],
	)

	const dailyReturnString = dailyReturn.toFixed(2) + '%'

	const offRampName = useSettingsStore(state => state.offRampName)
	const url = useOffRampUrl(entry, offRampName)

	console.log('url :>> ', url)

	return (
		<div className="mt-4 grid grid-cols-[1fr_7rem_repeat(content_fit,_2)_1fr] justify-between text-right">
			<div className="col-start-2 row-start-1 text-xl">
				{formattedSecondLastClose}
			</div>
			<div className="col-start-2">
				<div className="text-xs leading-tight text-slateA12">
					{npl(secondLast.date as string)}
				</div>
				<div className="text-[0.6rem] leading-tight text-slateA11">
					close price
				</div>
			</div>

			<div className={clsx('col-start-3 row-start-1 text-xl')}>
				{dailyReturnString}
			</div>
			<div className="col-start-3 flex justify-self-end">
				<div className="text-xs leading-tight text-slateA12">return</div>
			</div>

			<div className="col-start-4 row-start-1 text-xl">
				{formattedLastClose}
			</div>
			<div className="col-start-4">
				<div className="text-xs leading-tight text-slateA12">
					{npl(last.date as string)}
				</div>
				<div className="text-[0.6rem] leading-tight text-slateA11">
					close price
				</div>
			</div>

			<div className="col-start-5 row-span-2 row-start-1 py-1">
				<YahooButton url={url} />
			</div>
		</div>
	)
}
