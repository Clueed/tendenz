import * as ToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { ReactNode } from 'react'

export function OffRampToggle<T extends string[] | readonly string[]>({
	selectedKey,
	selectKey,
	allKeys,
}: {
	selectedKey: T[number]
	selectKey: (newKey: T[number]) => void
	allKeys: T
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
			asChild
			aria-label="Asset type"
		>
			<div
				className={clsx(
					'flex flex-col  items-start gap-x-3 gap-y-2 text-2xl sm:items-center',
				)}
			>
				{allKeys.map((key, _) => {
					const selected = key === selectedKey

					return (
						<ToggleGroup.Item key={key} value={key} className={clsx()}>
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
