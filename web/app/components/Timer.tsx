import clsx from 'clsx'
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
						Data is available on market close with a ~12 hour delay.
					</p>
				</div>
			}
			popoverColor="slate"
		>
			{open => (
				<div
					className={clsx(
						'flex items-center gap-2 rounded-md stroke-2 px-2 py-1 text-sm transition-all',
						{
							'bg-slate-a2 text-slate-a11 duration-500 hover:bg-slate-a4 hover:shadow-lg group-hover:bg-slate-a4':
								!open,
						},
						{ 'bg-slate-a11 text-slate-2': open },
					)}
				>
					<IconClock animationTrigger={open} />

					<span>{timeTill}h</span>
				</div>
			)}
		</Pop>
	)
}
