import Balancer from 'react-wrap-balancer'
import { HeroPopOver } from './HeroPopOver'

export default function Hero() {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 lg:text-center">
				<h1 className="text-5xl text-indigo-a12 sm:text-6xl">
					objective insight into financial markets
				</h1>

				<div className="my-2 text-xl text-slate-11 sm:text-2xl">
					<Balancer>
						<HeroPopOver
							learnMore="/docs#statistical-significants"
							popoverText={
								<>
									<p>
										By combining the asset&apos;s average closing price and
										volatility, we can estimate the likelihood of the most
										recent closing price (measured by sigma σ) .
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
				<div className="my-1 text-slate-11 sm:text-xl">
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
