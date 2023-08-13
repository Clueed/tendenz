import { B, H2, H3, LI, OL, P, UL } from './TextStyles'

export default function docs() {
	return (
		<>
			<section
				id="statistical-significants"
				className="grid grid-cols-default-prosa pt-10 text-xl leading-loose"
			>
				<H2>statistical significants: z-score</H2>
				<P>
					Suppose we look at a typically volatile stock like Tesla (TSLA) and
					typically very stable stock like Pfizer (PFE). Both their share prices
					increase by 10% from yesterday to today. For Pfizer, that would be
					exciting, but it wouldn&apos;t be as surprising for Tesla.
				</P>
				<P>
					The z-score is like a special way to tell how extraordinary something
					is. If we use the z-score for Tesla&apos;s jump, it might not be that
					high because it consideres to those big swings in the past. But if we
					use it for Pfizer&apos;s jump, it might be much higher because it
					doesn&apos;t usually move so much.
				</P>
				<P>
					So, the z-score helps us see how different a stock&apos;s movement is
					compared to its usual ups and downs. By applying it to a whole market
					and calculating it for each individual asset, it provides a simple way
					to distill the most interesting price movements, taking into account
					the typical ups and downs of each stock, in contrast to looking at
					just the biggest winners or losers.
				</P>
				<H3>our calculation method</H3>
				<P>
					To calculate the Z-Score, we use logarithmic returns. Logarithmic
					returns have useful qualities in this context, including symmetry
					around zero and additivity over time.
				</P>
				<P>
					To determine the Z-Score for a specific financial asset&apos;s recent
					return (from the day before yesterday to yesterday), we follow these
					steps:
				</P>
				<OL>
					<LI>
						Calculate the daily logarithmic return for the last two years.
					</LI>
					<LI>Find the average and standard deviation of these returns.</LI>
					<LI>Plug the most recent return X into the Z-Score formula.</LI>
				</OL>

				<div className="col-start-2 my-1 flex justify-center rounded-lg bg-slate-a3 px-5 py-1 leading-normal">
					z-score = (X - mean) / standard deviation
				</div>
			</section>
			<section
				id="market-capitalization"
				className="grid grid-cols-default-prosa py-10 text-xl leading-loose"
			>
				<H2>market capitalization</H2>
				<P>
					Market capitalization (market cap) is a financial metric that
					represents the total value of a publicly traded company. It is
					calculated by multiplying the current market price of one share of the
					company&apos;s stock by the total number of shares.
				</P>
				<H3>our calculation method</H3>

				<UL>
					<LI>
						<B>weighted shares outstanding:</B> When available, we use weighted
						shares outstanding as the primary basis for calculating market
						capitalization. Weighted shares outstanding consider different share
						classes and their respective ownership percentages and provide,
						thus, a more comprehensive and realistic market cap figure.
					</LI>
					<LI>
						<B>share class shares outstanding:</B> If weighted shares
						outstanding data is not available, we use the share class shares
						outstanding of the respective share class. This metric exclusively
						represents the number of shares belonging to the specific share
						class under consideration and does not take into account shares from
						other share classes associated with the same company or asset. In
						cases where there are no other types of share classes, the share
						class shares outstanding will align with the weighted shares
						outstanding figure.
					</LI>
					<LI>
						<B>&quot;as-is&quot; market capitalization:</B> In situations where
						neither weighted shares outstanding nor share class shares
						outstanding data is available, we resort to using the market
						capitalization &quot;as-is&quot; from our data providers. However,
						this approach might not reflect the complete picture due to the
						absence of insights into its underlying calculation.
					</LI>
				</UL>

				<H3>staleness</H3>
				<P>
					Given the way in which data is made available to us, some market
					capitalization figures may become stale or outdated over time. Market
					cap values can fluctuate frequently based on changes in stock prices
					and the number of outstanding shares. While we strive to maintain
					accurate and up-to-date data, you should be aware that market cap
					figures may not always reflect real-time market conditions.
				</P>
			</section>
		</>
	)
}
