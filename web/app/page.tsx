import { ComingSoon } from './components/ComingSoon'
import FilterContextProvider from './components/FilterContextProvider'
import Hero from './components/Hero'
import SigmaRoot from './components/Sigma/SigmaRoot'
import UsStocksHeader from './components/UsStocksHeader'
import { MARKET_CAP_BUCKETS, TypeGroupLabel } from './lib/MARKET_CAP_BUCKETS'
import SWRConfigProvider from './lib/api/SWRConfigProvider'
import { getFallback } from './lib/api/serverApi'

export const DEFAULT_MARKET_CAP_LABEL = '1b'
export const DEFAULT_TYPE_GROUP_LABELS = ['stocks'] as TypeGroupLabel[]

export default async function Home() {
	const fallback = await getFallback(
		MARKET_CAP_BUCKETS.map(b => b.minMarketCap),
	)

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
