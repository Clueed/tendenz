import * as ToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { ReactNode } from 'react'

export function OffRampToggle<T extends string[] | readonly string[]>({
	selectedKey,
	selectKey,
	allKeys,
	children,
	className,
}: {
	selectedKey: T[number]
	selectKey: (newKey: T[number]) => void
	allKeys: T
	children: (key: T[number], index: number, selected: boolean) => ReactNode
	className: string
}) {
	return (
		<ToggleGroup.Root
			type="single"
			value={selectedKey}
			onValueChange={newKey => {
				if (allKeys.includes(newKey)) {
					selectKey(newKey as T[number])
				} else {
					throw new Error('Selected invalid key')
				}
			}}
			aria-label="Asset type"
			className={className}
		>
			{allKeys.map((key, index) => {
				const selected = key === selectedKey
				return (
					<ToggleGroup.Item key={key} value={key} asChild>
						{children(key, index, selected)}
					</ToggleGroup.Item>
				)
			})}
		</ToggleGroup.Root>
	)
}

// very refactorable with Coming Soon
export const Highlight = ({
	children,
	className,
}: {
	children: ReactNode | string
	className?: string
}) => {
	return (
		<>
			{' '}
			<span className={clsx('relative')}>
				<div
					className={clsx(
						'absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full blur-xl',
						className,
					)}
				/>
				{children}
			</span>{' '}
		</>
	)
}
