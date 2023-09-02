import { ComingSoon } from './components/ComingSoon'
import Hero from './components/Hero'
import SigmaRoot from './components/Sigma/SigmaRoot'
import UsStocksHeader from './components/UsStocksHeader'
import { MARKET_CAP_BUCKETS } from './lib/MARKET_CAP_BUCKETS'
import SWRConfigProvider from './lib/api/SWRConfigProvider'
import { getFallback } from './lib/api/serverApi'

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
					<UsStocksHeader />
					<SigmaRoot
						title="stocks"
						marketCapBuckets={MARKET_CAP_BUCKETS}
						stockTypes={[
							'CS',
							'OS',
							'PFD',
							'ADRC',
							'ADRP',
							'GDR',
							'NYRS',
							'RIGHT',
						]}
					/>
					<SigmaRoot
						title="exchange traded products"
						marketCapBuckets={MARKET_CAP_BUCKETS}
						stockTypes={['ETF', 'ETN', 'ETV', 'ETS']}
					/>
					<SigmaRoot
						title="other assets"
						marketCapBuckets={MARKET_CAP_BUCKETS}
						stockTypes={['FUND', 'OTHER', 'BOND', 'SP']}
					/>
				</SWRConfigProvider>
			</section>

			<section className="my-[10vh]">
				<ComingSoon />
			</section>
		</>
	)
}
