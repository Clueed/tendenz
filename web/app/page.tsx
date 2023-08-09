import { ComingSoon } from './components/ComingSoon'
import { ExplainingTitle } from './components/ExplainingTitle'
import Hero from './components/Hero'
import SigmaList from './components/Sigma/SigmaRoot'
import { MARKET_CAP_BUCKETS } from './lib/MARKET_CAP_BUCKETS'
import SWRConfigProvider from './lib/api/SWRConfigProvider'
import { getFallback } from './lib/api/serverApi'

export default async function Home() {
	const fallback = await getFallback(
		MARKET_CAP_BUCKETS.map(b => b.minMarketCap),
	)

	return (
		<>
			<header className="mb-[9vh] mt-[4.5vh] flex flex-col gap-[2vh] sm:mb-[17.5vh] sm:mt-[12.5vh]">
				<Hero />
				<ExplainingTitle />
			</header>

			<section className="my-[9vh] sm:my-[15vh]">
				<SWRConfigProvider fallback={fallback}>
					<SigmaList marketCapBuckets={MARKET_CAP_BUCKETS} />
				</SWRConfigProvider>
			</section>

			<section className="my-[9vh] sm:my-[15vh]">
				<ComingSoon />
			</section>
		</>
	)
}
