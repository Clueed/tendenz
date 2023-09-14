import * as ToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { ReactNode } from 'react'

export default function StockTypeToggle<T extends string[]>({
	selectedKeys,
	selectKeys,
	allKeys,
}: {
	selectedKeys: T[number][]
	selectKeys: (newKeys: T[number][]) => void
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
				className={clsx(
					'flex flex-wrap items-start gap-x-3 rounded-md text-2xl',
				)}
			>
				{allKeys.map((key, index) => {
					const selected = selectedKeys.includes(key)

					return (
						<ToggleGroup.Item
							key={key}
							value={key}
							className={clsx(
								'group',
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
								</span>
							</Highlight>
						</ToggleGroup.Item>
					)
				})}
			</div>
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
