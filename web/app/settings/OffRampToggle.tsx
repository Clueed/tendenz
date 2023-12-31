import clsx from 'clsx'
import { CustomToggleGroupSingle } from '../components/CustomToggleGroup'
import { Highlight } from '../components/Highlight'
import { OFFRAMPS } from '../lib/CONSTANS'
import { useSettingsStore } from '../lib/stores/settingsStore'

export function OffRampToggle({}: {}) {
	const offRampName = useSettingsStore(state => state.offRampName)
	const setOffRampName = useSettingsStore(state => state.setOffRampName)
	const allOffRampNames = Object.keys(OFFRAMPS) as (keyof typeof OFFRAMPS)[]
	return (
		<CustomToggleGroupSingle
			selectedKeys={offRampName}
			selectKeys={setOffRampName}
			allKeys={allOffRampNames}
			className="flex flex-col items-start gap-x-3 gap-y-2 text-2xl sm:items-center"
			ariaLabel="offramp provider"
		>
			{(key, _, selected) => (
				<button className="group relative">
					<Highlight
						className={clsx(
							'bg-indigoA7 transition-opacity duration-1000 dark:bg-indigoA5',
							selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
						)}
					/>
					<span
						className={clsx(
							'tracking-wide transition-all duration-500',
							selected
								? 'text-indigo11 hover:text-indigo12'
								: 'text-slateA11 hover:text-slate12',
						)}
					>
						{OFFRAMPS[key]}
					</span>{' '}
				</button>
			)}
		</CustomToggleGroupSingle>
	)
}
