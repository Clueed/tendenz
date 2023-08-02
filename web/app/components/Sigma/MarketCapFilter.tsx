import * as motion from '@/app/lib/motionWrapper'
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
			<motion.div
				layout="size"
				className="inline-flex overflow-clip rounded-md bg-slate-a2 text-xs text-slate-11"
			>
				{allKeys.map(key => (
					<ToggleGroup.Item
						key={key}
						value={key}
						className={classNames(
							'px-2 py-1 tracking-wider transition-all',
							{
								'hover:bg-slate-a5 hover:text-slate-12': key !== selectedKey,
							},
							{
								'bg-slate-a8 text-slate-1': key === selectedKey,
							},
						)}
					>
						{key}
					</ToggleGroup.Item>
				))}
			</motion.div>
		</ToggleGroup.Root>
	)
}
