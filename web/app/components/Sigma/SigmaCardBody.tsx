import clsx from 'clsx'
import { useContext, useMemo } from 'react'
import { useOffRampUrl } from '../../lib/hooks/useOffRampUrl'
import { npl } from '../../lib/naturalLanguageProcessing'
import { useSettingsStore } from '../../lib/stores/settingsStore'
import { AssetTypeTag } from './AssetTypeTag'
import { MarketCapTag } from './MarketCapTag'
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

	return (
		<div className="mt-3 flex flex-wrap justify-end gap-5 px-3">
			<div className="flex flex-grow justify-around gap-1">
				<ReturnStack
					number={formattedSecondLastClose}
					label={npl(secondLast.date as string)}
					secondLabel="close price"
				/>
				<ReturnStack number={dailyReturnString} label="return" />
				<ReturnStack
					number={formattedLastClose}
					label={npl(last.date as string)}
					secondLabel="close price"
				/>
			</div>
			<div className="flex gap-5">
				<TagStack />
				<div className="-mr-3">
					<YahooButton url={url} />
				</div>
			</div>
		</div>
	)
}

const ReturnStack = ({
	number,
	label,
	secondLabel,
	className,
}: {
	number: string
	label: string
	secondLabel?: string
	className?: string
}) => (
	<div className={clsx('min-w-[4rem] text-right', className)}>
		<div className="text-xl">{number}</div>
		<div className="text-xs leading-tight text-slate12/90">{label}</div>
		{secondLabel && (
			<div className="text-xxs leading-tight text-slateA11">{secondLabel}</div>
		)}
	</div>
)

function TagStack({ className }: { className?: string }) {
	return (
		<div
			className={clsx(
				'flex flex-col flex-wrap items-end justify-center gap-2 text-lg',
				className,
			)}
		>
			<MarketCapTag />
			<AssetTypeTag />
		</div>
	)
}
