import { ReactNode } from 'react'

export default function Disclaimers() {
	return (
		<section className="grid grid-cols-default pt-10">
			<h1 className="col-start-2 mb-5 text-center text-4xl font-normal text-indigo-11">
				disclaimers
			</h1>
			<P>
				All data and information is provided “as is” for informational purposes
				only, and is not intended for trading purposes or financial, investment,
				tax, legal, accounting or other advice. Please consult your broker or
				financial representative to verify pricing before executing any trade.
				Tendenz is not an investment adviser, financial adviser or a securities
				broker. None of the data and information constitutes investment advice
				nor an offering, recommendation or solicitation by Tendenz to buy, sell
				or hold any security or financial product, and Tendenz makes no
				representation (and has no opinion) regarding the advisability or
				suitability of any investment.
			</P>
			<P>
				None of the data and information constitutes investment advice (whether
				general or customized). The financial products or operations referred to
				in such data and information may not be suitable for your investment
				profile and investment objectives or expectations. It is your
				responsibility to consider whether any financial product or operation is
				suitable for you based on your interests, investment objectives,
				investment horizon and risk appetite. Tendenz shall not be liable for
				any damages arising from any operations or investments in financial
				products referred to within. Tendenz does not recommend using the data
				and information provided as the only basis for making any investment
				decision.
			</P>
			<P>
				Data is provided by financial exchanges and other content providers and
				may be delayed as specified by financial exchanges or other data
				providers. Tendenz does not verify any data and disclaims any obligation
				to do so.
			</P>
			<P>
				Tendenz, its data or content providers, the financial exchanges and each
				of their affiliates and business partners (A) expressly disclaim the
				accuracy, adequacy, or completeness of any data and (B) shall not be
				liable for any errors, omissions or other defects in, delays or
				interruptions in such data, or for any actions taken in reliance
				thereon. Neither Tendenz nor any of our information providers will be
				liable for any damages relating to your use of the information provided
				herein. As used here, “business partners” does not refer to an agency,
				partnership, or joint venture relationship between Tendenz and any such
				parties.
			</P>
			<P>
				You agree not to copy, modify, reformat, download, store, reproduce,
				reprocess, transmit or redistribute any data or information found herein
				or use any such data or information in a commercial enterprise without
				obtaining prior written consent.
			</P>
			<P>
				Either Tendenz or its third party data or content providers have
				exclusive proprietary rights in the data and information provided.
			</P>
		</section>
	)
}

function P({ children }: { children: ReactNode }) {
	return (
		<p className="col-start-2 mt-4 leading-loose text-slate-12">{children}</p>
	)
}
