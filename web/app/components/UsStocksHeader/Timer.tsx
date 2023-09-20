import { PopoverTrigger } from '@radix-ui/react-popover'
import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import { hoursUntilNextWeekdayHour } from '../../lib/hoursUntilNextWeekdayHour'
import Pop from '../Pop'
import { PopoverContentStyled, PopoverRoot } from '../Pop2'

export default function Timer() {
	const timeTill = hoursUntilNextWeekdayHour(2)

	return (
		<PopoverRoot>
			<PopoverTrigger>
				<Icon
					name="radix-icons/clock"
					className="will-change-transform group-radix-state-open:animate-[rotate-360_1s_cubic-bezier(.12,0,.36,1.5)]"
				/>
				<span className="font-light">{timeTill}h</span>
			</PopoverTrigger>
			<PopoverContentStyled color="slate">
				<p>{timeTill} hours left until the next market update.</p>
				<p className="mt-2">
					Data is available on market close with a ~12 hour delay.
				</p>
			</PopoverContentStyled>
		</PopoverRoot>
	)

	return (
		<Pop
			offset={5}
			popoverContent={
				<div className="w-40">
					<p>{timeTill} hours left until the next market update.</p>
					<p className="mt-2">
						Data is available on market close with a ~12 hour delay.
					</p>
				</div>
			}
			popoverColor="slate"
			rootClassName={clsx(
				'flex items-center gap-1 rounded-md stroke-2 px-2.5 py-1.5 text-sm transition-all duration-500 bg-slateA2 text-slateA11 will-change-color',
				'data-[state=closed]:hover:bg-slateA4 data-[state=closed]:hover:shadow-lg data-[state=closed]:hover:bg-slateA4',
				'data-[state=open]:bg-slateA11 data-[state=open]:text-slate2',
			)}
		>
			<Icon
				name="radix-icons/clock"
				className="will-change-transform group-radix-state-open:animate-[rotate-360_1s_cubic-bezier(.12,0,.36,1.5)]"
			/>
			<span className="font-light">{timeTill}h</span>
		</Pop>
	)
}
