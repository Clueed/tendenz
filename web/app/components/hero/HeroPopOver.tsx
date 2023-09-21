import { ReactNode } from 'react'
import { PopRoot, PopTrigger, PopoverContentStyled } from '../Pop2'
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
		<PopRoot>
			<PopTrigger className="border-b-2 border-slateA7 transition-colors duration-500 hover:border-slateA9 hover:text-slateA12 data-[state=open]:border-indigoA8 data-[state=open]:text-indigo12">
				{triggerText}
			</PopTrigger>
			<PopoverContentStyled color={color}>
				{popoverText}
				<div className="flex justify-end">
					{learnMore && <PopLearnMore color={color} href={learnMore} />}{' '}
				</div>
			</PopoverContentStyled>
		</PopRoot>
	)
}
