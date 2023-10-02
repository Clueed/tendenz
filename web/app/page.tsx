import { ComingSoon } from '@/app/components/comingsoon/ComingSoon'
import { FilterCluster } from '@/app/components/filtercluster/FilterCluster'
import Hero from '@/app/components/hero/Hero'
import { SigmaTable } from '@/app/components/sigma/SigmaTable'
import UsStocksHeader from '@/app/components/usstocksheader/UsStocksHeader'
import {
	DEFAULT_MARKET_CAP,
	DEFAULT_TYPE_GROUP_LABELS,
	TypeGroupLabel,
} from '@/app/lib/CONSTANS'
import { getFallback } from '@/app/lib/api/serverApi'
import { ApiCall } from '@/app/lib/api/sharedApi'
import SWRConfigProvider from '@/app/lib/providers/SWRConfigProvider'

export default async function Home() {
	const selectTypeLabels: TypeGroupLabel[][] = [
		DEFAULT_TYPE_GROUP_LABELS,
		['stocks', 'ETFs'],
		['stocks', 'ETFs', 'others'],
	]

	const selectTypesDefaultMarketCap: ApiCall[] = selectTypeLabels.map(
		typeLabels => {
			return {
				page: 0,
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
					<SigmaTable />
				</SWRConfigProvider>
			</section>

			<section className="my-[10vh]">
				<ComingSoon />
			</section>
		</>
	)
}
