import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import { hoursUntilNextWeekdayHour } from '../../lib/hoursUntilNextWeekdayHour'
import Pop from '../Pop'

export default function Timer() {
	const timeTill = hoursUntilNextWeekdayHour(2)

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
				'flex items-center gap-1 rounded-md stroke-2 px-2.5 py-1.5 text-sm transition-all duration-500',
				'bg-slate-a2 text-slate-a11 hover:bg-slate-a4 hover:shadow-lg group-hover:bg-slate-a4',
				'group-radix-state-open:bg-slate-a11 group-radix-state-open:text-slate-2',
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
