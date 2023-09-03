import { ComingSoon } from './components/ComingSoon'
import FilterContextProvider from './components/FilterContextProvider'
import Hero from './components/Hero'
import SigmaRoot from './components/Sigma/SigmaRoot'
import UsStocksHeader from './components/UsStocksHeader'
import {
	DEFAULT_MARKET_CAP_LABEL,
	DEFAULT_TYPE_GROUP_LABELS,
	MARKET_CAP_BUCKETS,
	TypeGroupLabel,
} from './lib/MARKET_CAP_BUCKETS'
import SWRConfigProvider from './lib/api/SWRConfigProvider'
import { getFallback } from './lib/api/serverApi'
import { ApiQuery } from './lib/api/sharedApi'

export default async function Home() {
	const defaultTypeAllMarketCaps: ApiQuery[] = MARKET_CAP_BUCKETS.map(
		({ minMarketCap }) => {
			return {
				minMarketCap: minMarketCap,
				typeGroups: DEFAULT_TYPE_GROUP_LABELS,
			}
		},
	)

	const minMarketCap = MARKET_CAP_BUCKETS.filter(
		bucket => bucket.label === DEFAULT_MARKET_CAP_LABEL,
	)[0].minMarketCap
	const selectTypesGroups: TypeGroupLabel[][] = [
		DEFAULT_TYPE_GROUP_LABELS,
		['stocks', 'ETFs'],
		['stocks', 'ETFs', 'others'],
	]
	const selectTypesDefaultMarketCap: ApiQuery[] = selectTypesGroups.map(
		typeGroups => {
			return {
				minMarketCap: minMarketCap,
				typeGroups: typeGroups,
			}
		},
	)

	const fallback = await getFallback([
		...defaultTypeAllMarketCaps,
		...selectTypesDefaultMarketCap,
	])

	return (
		<>
			<header className="my-[6vh] sm:my-[12.5vh]">
				<Hero />
			</header>

			<section className="mb-[9vh] sm:mb-[15vh]">
				<SWRConfigProvider fallback={fallback}>
					<FilterContextProvider>
						<UsStocksHeader />
						<SigmaRoot />
					</FilterContextProvider>
				</SWRConfigProvider>
			</section>

			<section className="my-[10vh]">
				<ComingSoon />
			</section>
		</>
	)
}
