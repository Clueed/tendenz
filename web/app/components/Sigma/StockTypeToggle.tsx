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
			aria-label="Asset type"
		>
			<div
				className={classNames(
					'group inline-flex gap-3 overflow-clip rounded-md text-2xl transition-all duration-1000',
				)}
			>
				{allKeys.map(key => (
					<ToggleGroup.Item
						key={key}
						value={key}
						className={classNames(
							'tracking-wide text-slate-11 transition-all duration-500',
							'hover:text-slate-12 hover:shadow',
							{
								'text-slate-12': selectedKeys.includes(key),
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
