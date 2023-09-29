import MarketCapFilter from './MarketCapFilter'
import MarketCapFilterLabel from './MarketCapFilterLabel'
import StockTypeToggle from './StockTypeToggle'
export function FilterCluster({}) {
	return (
		<div className="mb-[2vh] mt-[1vh] grid grid-cols-default">
			<div className="col-start-2 grid grid-cols-2 items-end gap-x-5">
				<StockTypeToggle />

				<MarketCapFilter />
				<div className="pt-0.5 text-xxs">
					<span className="uppercase tracking-wider text-indigo11">
						assets&nbsp;types
					</span>{' '}
					<span className="text-slate11">United&nbsp;States</span>
				</div>
				<div className="text-right leading-none">
					<MarketCapFilterLabel />
				</div>
			</div>
		</div>
	)
}
