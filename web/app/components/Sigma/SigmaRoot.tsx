import MarketCapCluster from '../MarketCapCluster'
import StockTypeToggleDataWrapper from '../StockTypeToggleDataWrapper'
import { SigmaAccordion } from './SigmaAccordion'

export default function SigmaRoot({}: {}) {
	return (
		<>
			<div className="mb-[2vh] mt-[1vh] grid grid-cols-default">
				<div className="col-start-2 mb-2 flex justify-between gap-10 max-sm:flex-col max-sm:gap-1">
					<StockTypeToggleDataWrapper />
					<MarketCapCluster />
				</div>
			</div>

			<SigmaAccordion />
		</>
	)
}
