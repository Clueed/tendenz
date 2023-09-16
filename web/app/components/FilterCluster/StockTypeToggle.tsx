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
			{(key, index, selected) => (
				<button
					className={clsx(
						'group relative',
						{ 'order-1 max-sm:order-3': index === 0 },
						{ 'order-2': index === 1 },
						{ 'order-3 max-sm:order-2': index === 2 },
					)}
				>
					<Highlight
						className={clsx(
							'bg-indigo-a7 transition-opacity duration-1000 dark:bg-indigo-a5',
							selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
						)}
					/>
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
				</button>
			)}
		</CustomToggleGroupMultiple>
	)
}
