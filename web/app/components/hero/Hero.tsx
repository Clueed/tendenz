import Balancer from 'react-wrap-balancer'
import { HistoricalPopover, StatPopover } from './HeroPops'

export default function Hero() {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 sm:text-center">
				<h1 className="text-5xl leading-[1.1] text-indigoA12 sm:text-6xl">
					objective insight <span className="opacity-75"> across</span>{' '}
					financial markets
				</h1>

				<div className="mt-4 text-xl text-slate11 sm:text-2xl">
					<Balancer>
						<StatPopover>statistical probabilities</StatPopover> of market close
						prices <br />
					</Balancer>
				</div>
				<div className="mt-4 text-slate11 sm:text-xl">
					based on <HistoricalPopover>historical returns</HistoricalPopover>
				</div>
			</div>
		</div>
	)
}
