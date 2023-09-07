import StockTypeToggleDataWrapper from '../StockTypeToggleDataWrapper'
import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapFilterLabel'
import { SigmaAccordion } from './SigmaAccordion'

export default function SigmaRoot({}: {}) {
	return (
		<>
			<div className="mb-[2vh] mt-[1vh] grid grid-cols-default">
				<div className="col-start-2 grid grid-cols-2 items-start">
					<StockTypeToggleDataWrapper />

					<MarketCapFilter />
					<div className="text-xxs">
						<span className="uppercase tracking-wider text-indigo-11">
							assets&nbsp;types
						</span>{' '}
						<span className="text-slate-11">United&nbsp;States</span>
					</div>
					<MarketCapFilterLabel />
				</div>
			</div>

			<SigmaAccordion />
		</>
	)
}
