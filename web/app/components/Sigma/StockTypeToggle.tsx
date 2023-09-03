import * as ToggleGroup from '@radix-ui/react-toggle-group'
import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'

export default function StockTypeToggle<T extends string[]>({
	selectedKeys,
	selectKeys,
	allKeys,
}: {
	selectedKeys: T[number][]
	selectKeys: Dispatch<SetStateAction<T[number][]>>
	allKeys: T
}) {
	return (
		<ToggleGroup.Root
			type="multiple"
			value={selectedKeys}
			onValueChange={newKeys => {
				newKeys.length > 0 && selectKeys(newKeys)
			}}
			asChild
		>
			<div
				className={classNames(
					'group inline-flex overflow-clip rounded-md bg-slate-a2 text-xs transition-all duration-1000',
					'hover:shadow-lg hover:backdrop-blur-3xl',
				)}
			>
				{allKeys.map(key => (
					<ToggleGroup.Item
						key={key}
						value={key}
						className={classNames(
							'px-2 py-1 tracking-wide text-slate-11 transition-all duration-500',
							'hover:!bg-slate-a6 hover:shadow group-hover:text-slate-12',
							{
								'bg-slate-a6 text-slate-12': selectedKeys.includes(key),
							},
							{
								'group-hover:bg-slate-a1': !selectedKeys.includes(key),
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
