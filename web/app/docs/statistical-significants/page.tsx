import { H2, H3, LI, OL, P } from '../TextStyles'

export default function docs() {
	return (
		<section className="grid grid-cols-default text-xl leading-loose">
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
				to distill the most interesting price movements, taking into account the
				typical ups and downs of each stock, in contrast to looking at just the
				biggest winners or losers.
			</P>
			<H3>our calculation method</H3>
			<P>
				To calculate the Z-Score, we use logarithmic returns. Logarithmic
				returns have useful qualities in this context, including symmetry around
				zero and additivity over time.
			</P>
			<P>
				To determine the Z-Score for a specific financial asset&apos;s recent
				return (from the day before yesterday to yesterday), we follow these
				steps:
			</P>
			<OL>
				<LI>Calculate the daily logarithmic return for the last two years.</LI>
				<LI>Find the average and standard deviation of these returns.</LI>
				<LI>Plug the most recent return X into the Z-Score formula.</LI>
			</OL>

			<div className="col-start-2 my-1 flex justify-center rounded-lg bg-slate-a3 px-5 py-1 leading-normal">
				z-score = (X - mean) / standard deviation
			</div>
		</section>
	)
}
