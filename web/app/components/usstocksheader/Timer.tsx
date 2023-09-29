import { FreeFloatButton } from '@/app/components/FreeFloatButton'
import {
	PopRoot,
	PopTrigger,
	PopoverContentStyled,
} from '@/app/components/Pop2'
import { hoursUntilNextWeekdayHour } from '@/app/lib/hoursUntilNextWeekdayHour'
import { Icon } from '@tendenz/icons'

export default function Timer() {
	const timeTill = hoursUntilNextWeekdayHour(2)

	return (
		<PopRoot>
			<PopTrigger asChild>
				<FreeFloatButton className="group flex items-center gap-1.5 data-[state=open]:bg-slateA11 data-[state=open]:text-slate1 data-[state=open]:hover:bg-slateA11">
					<Icon
						name="radix-icons/clock"
						className="will-change-transform group-radix-state-open:animate-[rotate-360_1s_cubic-bezier(.12,0,.36,1.5)]"
					/>
					<span className="text-sm font-light leading-none">{timeTill}h</span>
				</FreeFloatButton>
			</PopTrigger>
			<PopoverContentStyled color="slate">
				<p>{timeTill} hours left until the next market update.</p>
				<p className="mt-2">
					Data is available on market close with a ~12 hour delay.
				</p>
			</PopoverContentStyled>
		</PopRoot>
	)
}
