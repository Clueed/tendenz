import { ComingSoon } from './components/ComingSoon'
import { ExplainingTitle } from './components/ExplainingTitle'
import Hero from './components/Hero'
import SigmaList from './components/Sigma/SigmaList'
import SWRConfigProvider from './components/api/SWRConfigProvider'
import { getFallback } from './components/api/serverApi'
import { MARKET_CAP_BUCKETS } from './misc/MARKET_CAP_BUCKETS'

export default async function Home() {
	const fallback = await getFallback(
		MARKET_CAP_BUCKETS.map(b => b.minMarketCap),
	)

	return (
		<>
			<header className="my-[5vh] flex flex-col gap-[2vh]">
				<Hero />
				<ExplainingTitle />
			</header>

			<section className="my-[5vh]">
				<SWRConfigProvider fallback={fallback}>
					<SigmaList marketCapBuckets={MARKET_CAP_BUCKETS} />
				</SWRConfigProvider>
			</section>

			<section>
				<ComingSoon />
			</section>
		</>
	)
}
