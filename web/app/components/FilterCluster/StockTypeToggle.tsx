'use client'
import clsx from 'clsx'
import { TYPE_GROUPS } from '../../lib/CONSTANS'
import { useFilterStore } from '../../lib/stores/filterStore'
import { CustomToggleGroupMultiple } from '../CustomToggleGroup'
import { Highlight } from '../Highlight'

export default function StockTypeToggle({}: {}) {
	const setTypeLabels = useFilterStore(state => state.setTypeLabels)
	const typeLabels = useFilterStore(state => state.typeLabels)
	return (
		<CustomToggleGroupMultiple
			selectedKeys={typeLabels}
			selectKeys={setTypeLabels}
			allKeys={TYPE_GROUPS.map(group => group.label)}
			className="flex flex-wrap items-start gap-x-3 text-2xl"
			ariaLabel="Asset type"
		>
			{(key, _, selected) => (
				<button className="group">
					<Highlight
						className={clsx(
							'bg-indigo-a7 transition-opacity duration-1000 dark:bg-indigo-a5',
							selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
						)}
					>
						<span
							className={clsx(
								'tracking-wide transition-all duration-500',
								selected
									? 'text-indigo-11 hover:text-indigo-12'
									: 'text-slate-a11 hover:text-slate-12',
							)}
						>
							{key}
						</span>{' '}
					</Highlight>
				</button>
			)}
		</CustomToggleGroupMultiple>
	)
}
