import Link from 'next/link'
import { H2 } from './TextStyles'

export default function Docs() {
	return (
		<div className="grid grid-cols-default">
			<MainDocsLink
				href="/docs/statistical-significants"
				text={'statistical significants'}
			/>
			<MainDocsLink href="/docs/market-cap" text={'market capitalization'} />
		</div>
	)
}

function MainDocsLink({ href, text }: { href: string; text: string }) {
	return (
		<Link href={href} className="col-start-2">
			<H2>{text}</H2>
		</Link>
	)
}
