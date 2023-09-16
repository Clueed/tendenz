import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ReactNode } from 'react'

export function CustomToggleGroupSingle<
	T extends string[] | readonly string[],
	K extends T[number],
>({
	selectedKeys,
	selectKeys,
	allKeys,
	children,
	className,
	ariaLabel,
}: {
	selectedKeys: K
	selectKeys: (newKey: K) => void
	allKeys: T
	children: (key: K, index: number, selected: boolean) => ReactNode
	className: string
	ariaLabel: string
}) {
	return (
		<ToggleGroup.Root
			type="single"
			value={selectedKeys}
			onValueChange={newKey => {
				if (allKeys.includes(newKey)) {
					selectKeys(newKey as K)
				} else {
					throw new Error('Selected invalid key')
				}
			}}
			aria-label={ariaLabel}
			className={className}
		>
			{allKeys.map((key, index) => {
				const selected = key === selectedKeys
				return (
					<ToggleGroup.Item key={key} value={key} asChild>
						{children(key as K, index, selected)}
					</ToggleGroup.Item>
				)
			})}
		</ToggleGroup.Root>
	)
}

export function CustomToggleGroupMultiple<
	T extends string[] | readonly string[],
	K extends T[number],
>({
	selectedKeys,
	selectKeys,
	allKeys,
	children,
	className,
	ariaLabel,
}: {
	selectedKeys: K[]
	selectKeys: (newKey: K[]) => void
	allKeys: T
	children: (key: K, index: number, selected: boolean) => ReactNode
	className: string
	ariaLabel: string
}) {
	return (
		<ToggleGroup.Root
			type="multiple"
			value={selectedKeys}
			onValueChange={newKeys => {
				if (newKeys.every(key => allKeys.includes(key))) {
					newKeys.length > 0 && selectKeys(newKeys as Ks)
				} else {
					throw new Error('Selected invalid key')
				}
			}}
			aria-label={ariaLabel}
			className={className}
		>
			{allKeys.map((key, index) => {
				const selected = selectedKeys.includes(key as K)
				return (
					<ToggleGroup.Item key={key} value={key} asChild>
						{children(key as K, index, selected)}
					</ToggleGroup.Item>
				)
			})}
		</ToggleGroup.Root>
	)
}
