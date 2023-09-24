import clsx from 'clsx'
import { ReactNode } from 'react'
import Pop from '../Pop'
import { PopLearnMore } from '../PopLearnMore'
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
			offset={7.5}
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
			<span
				className={clsx(
					'border-b-2 border-slate-a7 transition-colors duration-500 hover:border-slate-a9 hover:text-slate-a12',
					'group-radix-state-open:border-indigo-a8 group-radix-state-open:text-indigo-12',
				)}
			>
				{triggerText}
			</span>
		</Pop>
	)
}
