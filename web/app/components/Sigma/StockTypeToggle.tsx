import * as ToggleGroup from '@radix-ui/react-toggle-group'
import classNames from 'classnames'
import { Dispatch, ReactNode, SetStateAction } from 'react'

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
					'group inline-flex flex-col-reverse items-start gap-1 rounded-md text-2xl transition-all duration-1000 sm:flex-row sm:gap-3 ',
				)}
			>
				{allKeys.map(key => {
					const selected = selectedKeys.includes(key)

					return (
						<ToggleGroup.Item key={key} value={key} className={classNames()}>
							<Highlight
								className={classNames(
									'transition-all duration-1000',
									selected ? 'bg-indigo-a5' : 'bg-indigo-a1',
								)}
							>
								<span
									className={classNames(
										'tracking-wide transition-all duration-500 ',
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
			<span className={classNames('relative')}>
				<div
					className={classNames(
						'absolute -inset-x-8 inset-y-0 -z-10 transform-gpu rounded-full blur-xl',
						className,
					)}
				/>
				{children}
			</span>{' '}
		</>
	)
}
