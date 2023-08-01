import { ReactNode } from 'react'

export default function Disclaimers() {
	return (
		<>
			<div className="grid grid-cols-default pt-10">
				<H1>docs</H1>
			</div>
			<section className="grid grid-cols-default pt-10">
				<H2>market capitalization</H2>
				<P>
					Market capitalization (market cap) is a financial metric that
					represents the total value of a publicly traded company. It is
					calculated by multiplying the current market price of one share of the
					company's stock by the total number of outstanding shares. Market cap
					is a crucial indicator used by investors and analysts to assess a
					company's size and relative value in the market. Companies are often
					categorized based on their market cap into different classes, such as
					large-cap, mid-cap, small-cap, and micro-cap.
				</P>
				<H3>our calculation method</H3>
				<P>
					<UL>
						<LI>
							<B>Weighted Shares Outstanding:</B> When available, we use
							weighted shares outstanding as the primary basis for calculating
							market capitalization. Weighted shares outstanding consider
							different share classes and their respective ownership
							percentages, providing a more comprehensive and realistic market
							cap figure.
						</LI>
						<LI>
							<B>Share Class Shares Outstanding:</B> If weighted shares
							outstanding data is not available, we use the share class shares
							outstanding of the respective share class. This approach helps us
							account for the differences in market values and voting rights
							that may exist between various share classes.
						</LI>
						<LI>
							<B>As-Is Market Capitalization:</B> In situations where neither
							weighted shares outstanding nor share class shares outstanding
							data is available, we resort to using the market capitalization
							"as-is" from our data providers. However, this approach might not
							reflect the complete picture due to the absence of insights into
							its underlying calculation.
						</LI>
					</UL>
				</P>
				<H3>staleness</H3>
				<P>
					Given the way in which data is made available to us, some market
					capitalization figures may become stale or outdated over time. Market
					cap values can fluctuate frequently based on changes in stock prices
					and the number of outstanding shares. While we strive to maintain
					accurate and up-to-date data, users should be aware that market cap
					figures may not always reflect real-time market conditions. It's
					advisable to verify the currency of the data when making investment
					decisions or conducting financial analysis.
				</P>
			</section>
		</>
	)
}

function H1({ children }: { children: ReactNode }) {
	return (
		<h2 className="col-start-2 mb-5 text-4xl font-normal text-indigo-11 lg:text-center">
			{children}
		</h2>
	)
}

function H2({ children }: { children: ReactNode }) {
	return (
		<h2 className="col-start-2 mt-5 text-3xl font-normal text-indigo-11 lg:text-center">
			{children}
		</h2>
	)
}

function H3({ children }: { children: ReactNode }) {
	return (
		<h3 className="col-start-2 mt-4 text-2xl font-normal text-indigo-11 lg:text-center">
			{children}
		</h3>
	)
}

function P({ children }: { children: ReactNode }) {
	return (
		<p className="col-start-2 mt-2 leading-loose text-slate-12">{children}</p>
	)
}

function UL({ children }: { children: ReactNode }) {
	return <ul className="list-inside list-disc">{children}</ul>
}

function LI({ children }: { children: ReactNode }) {
	return <li className="mb-2">{children}</li>
}

function B({ children }: { children: ReactNode }) {
	return <b className="font-medium">{children}</b>
}
