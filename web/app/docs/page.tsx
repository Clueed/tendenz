import { B, H2, H3, LI, P, UL } from './TextStyles'

export default function docs() {
	return (
		<>
			<>
				<section className="grid grid-cols-default pt-10">
					<H2>market capitalization</H2>
					<P>
						Market capitalization (market cap) is a financial metric that
						represents the total value of a publicly traded company. It is
						calculated by multiplying the current market price of one share of
						the company&apos;s stock by the total number of outstanding shares.
						Market cap is a crucial indicator used by investors and analysts to
						assess a company&apos;s size and relative value in the market.
						Companies are often categorized based on their market cap into
						different classes, such as large-cap, mid-cap, small-cap, and
						micro-cap.
					</P>
					<H3>our calculation method</H3>
					<P>
						{''}
						<UL>
							<LI>
								<B>weighted shares outstanding:</B> When available, we use
								weighted shares outstanding as the primary basis for calculating
								market capitalization. Weighted shares outstanding consider
								different share classes and their respective ownership
								percentages, providing a more comprehensive and realistic market
								cap figure.
							</LI>
							<LI>
								<B>share class shares outstanding:</B> If weighted shares
								outstanding data is not available, we use the share class shares
								outstanding of the respective share class. This approach helps
								us account for the differences in market values and voting
								rights that may exist between various share classes.
							</LI>
							<LI>
								<B>&quot;as-is&quot; market capitalization:</B> In situations
								where neither weighted shares outstanding nor share class shares
								outstanding data is available, we resort to using the market
								capitalization &quot;as-is&quot; from our data providers.
								However, this approach might not reflect the complete picture
								due to the absence of insights into its underlying calculation.
							</LI>
						</UL>
					</P>
					<H3>staleness</H3>
					<P>
						Given the way in which data is made available to us, some market
						capitalization figures may become stale or outdated over time.
						Market cap values can fluctuate frequently based on changes in stock
						prices and the number of outstanding shares. While we strive to
						maintain accurate and up-to-date data, users should be aware that
						market cap figures may not always reflect real-time market
						conditions. It&apos;s advisable to verify the currency of the data
						when making investment decisions or conducting financial analysis.
					</P>
				</section>
			</>
		</>
	)
}
