'use client'
import classNames from 'classnames'
import { ReactNode } from 'react'
import Pop from './Pop'
import { PopLearnMore } from './Sigma/PopLearnMore'
export function HeroPopOver({
	popoverText,
	triggerText,
	learnMore,
}: {
	popoverText: string | ReactNode
	triggerText: string | ReactNode
	learnMore?: false | string
}) {
	const color = 'indigo'
	return (
		<Pop
			offset={0}
			popoverColor={color}
			popoverContent={
				<div className="w-[calc(var(--radix-popover-trigger-width)*1.5)] text-base leading-relaxed">
					{popoverText}
					<div className="flex justify-end">
						{learnMore && <PopLearnMore color={color} href={learnMore} />}
					</div>
				</div>
			}
		>
			{open => (
				<span
					className={classNames('border-b-2 transition-colors', {
						'border-slate-a7 duration-500 hover:border-slate-a9 hover:text-slate-a12':
							!open,
						'border-indigo-a8 text-indigo-12': open,
					})}
				>
					{triggerText}
				</span>
			)}
		</Pop>
	)
}
