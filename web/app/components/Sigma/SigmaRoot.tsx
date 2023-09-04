import StockTypeToggleDataWrapper from '../StockTypeToggleDataWrapper'
import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapFilterLabel'
import { SigmaAccordion } from './SigmaAccordion'

export default function SigmaRoot({}: {}) {
	return (
		<>
			<div className="mb-[2vh] mt-[1vh] grid grid-cols-default">
				<div className="col-start-2 mb-2 flex flex-wrap items-end justify-between align-bottom">
					<StockTypeToggleDataWrapper />

					<MarketCapFilter />
				</div>
				<div className="col-start-2 flex items-start justify-between align-top">
					<h3 className="text-sm leading-none text-slate-11">United States</h3>
					<MarketCapFilterLabel />
				</div>
			</div>

			<SigmaAccordion />
		</>
	)
}
