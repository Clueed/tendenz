import classNames from 'classnames'
import { hoursUntilNextWeekdayHour } from '../lib/hoursUntilNextWeekdayHour'
import IconClock from './IconClock'
import Pop from './Pop'

export default function Timer() {
	const timeTill = hoursUntilNextWeekdayHour(2)

	return (
		<Pop
			offset={5}
			popoverContent={
				<div className="w-40">
					<p>{timeTill} hours left until the next market update.</p>
					<p className="mt-2">
						Data is available on market close with a ~6 hour delay.
					</p>
				</div>
			}
			popoverColor="slate"
		>
			{open => (
				<div
					className={classNames(
						'flex items-center gap-1 rounded-md stroke-2 px-2 py-1 text-sm transition-all',
						{
							'bg-slate-a2 text-slate-a11 group-hover/popover:bg-slate-a5 group-hover/popover:shadow-sm':
								!open,
						},
						{ 'bg-slate-a11 text-slate-2 shadow-md': open },
					)}
				>
					<IconClock animationTrigger={open} />
					<div className="leading-none"></div>
					{timeTill}h
				</div>
			)}
		</Pop>
	)
}
