import classNames from 'classnames'
import { hoursUntilNextWeekdayHour } from '../misc/hoursUntilNextWeekdayHour'
import IconClock from './IconClock'
import Pop from './Pop'

export default function Timer() {
	const timeTill = hoursUntilNextWeekdayHour(2)

	return (
		<Pop
			offset={0}
			popoverContent={
				<div className="w-40 text-slate-12">
					{timeTill} hours until the next update. Data is available after
					trading days with a 24 hour delay.
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
						{ 'bg-slate-a8 text-slate-2 shadow-md': open },
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
