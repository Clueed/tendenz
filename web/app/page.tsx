import SWRConfigProvider from './components/SWRConfigProvider'
import UsStocksHeader from './components/UsStocksHeader/UsStocksHeader'
import { ComingSoon } from './components/comingsoon/ComingSoon'
import { FilterCluster } from './components/filtercluster/FilterCluster'
import Hero from './components/hero/Hero'
import { SigmaAccordion } from './components/sigma/SigmaAccordion'
import {
	DEFAULT_MARKET_CAP,
	DEFAULT_TYPE_GROUP_LABELS,
	TypeGroupLabel,
} from './lib/CONSTANS'
import { getFallback } from './lib/api/serverApi'
import { ApiQuery } from './lib/api/sharedApi'

export default async function Home() {
	const selectTypeLabels: TypeGroupLabel[][] = [
		DEFAULT_TYPE_GROUP_LABELS,
		['stocks', 'ETFs'],
		['stocks', 'ETFs', 'others'],
	]

	const selectTypesDefaultMarketCap: ApiQuery[] = selectTypeLabels.map(
		typeLabels => {
			return {
				marketCap: DEFAULT_MARKET_CAP,
				typeLabels,
			}
		},
	)

	const fallback = await getFallback(selectTypesDefaultMarketCap)

	return (
		<>
			<header className="my-[6vh] sm:my-[12.5vh]">
				<Hero />
			</header>

			<section className="mb-[9vh] sm:mb-[15vh]">
				<SWRConfigProvider fallback={fallback}>
					<UsStocksHeader />
					<FilterCluster />
					<SigmaAccordion />
				</SWRConfigProvider>
			</section>

			<section className="my-[10vh]">
				<ComingSoon />
			</section>
		</>
	)
}
