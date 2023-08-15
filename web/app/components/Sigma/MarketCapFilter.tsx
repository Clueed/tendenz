import * as ToggleGroup from '@radix-ui/react-toggle-group'
import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'

export default function MarketCapFilter<T extends string[]>({
	selectedKey,
	selectKey,
	allKeys,
}: {
	selectedKey: T[number]
	selectKey: Dispatch<SetStateAction<T[number]>>
	allKeys: T
}) {
	return (
		<ToggleGroup.Root
			type="single"
			value={selectedKey}
			onValueChange={newKey => {
				if (allKeys.includes(newKey)) {
					selectKey(newKey)
				}
			}}
			asChild
		>
			<div className="group inline-flex overflow-clip rounded-md bg-slate-a2 text-xs transition-all duration-1000 hover:shadow-lg hover:backdrop-blur-3xl">
				{allKeys.map(key => (
					<ToggleGroup.Item
						key={key}
						value={key}
						className={classNames(
							'px-2 py-1 tracking-widest text-slate-11 transition-all duration-500 hover:!bg-slate-a6 hover:shadow group-hover:bg-slate-a1 group-hover:text-slate-12',
							{
								'bg-slate-a6 text-slate-12 ': key === selectedKey,
							},
						)}
					>
						{key}
					</ToggleGroup.Item>
				))}
			</div>
		</ToggleGroup.Root>
	)
}
