import Balancer from 'react-wrap-balancer'
import { HeroPopOver } from './HeroPopOver'

export default function Hero() {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 sm:text-center">
				<h1 className="text-5xl leading-[1.1] text-indigo-a12 sm:text-6xl">
					objective insight <span className="opacity-75"> across</span>{' '}
					financial markets
				</h1>

				<div className="mt-4 text-xl text-slate-11 sm:text-2xl">
					<Balancer>
						<HeroPopOver
							learnMore="/docs/statistical-significants"
							popoverText={
								<>
									<p>
										By combining an asset&apos;s average prices with its average
										volatility, we can estimate the likelihood of the most
										recent closing price (measured by sigma σ).
									</p>
									<p className="mt-2">
										A high σ indicates an unusual or extraordinary change in
										price.
									</p>
								</>
							}
							triggerText="statistical probabilities"
						/>{' '}
						of market close prices <br />
					</Balancer>
				</div>
				<div className="mt-4 text-slate-11 sm:text-xl">
					based on{' '}
					<HeroPopOver
						learnMore={false}
						popoverText="We use the daily returns of each assets over the past two years."
						triggerText="historical returns"
					/>
				</div>
			</div>
		</div>
	)
}
