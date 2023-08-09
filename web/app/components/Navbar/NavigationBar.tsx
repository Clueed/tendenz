import Link from 'next/link'
import { Logo } from './Logo'

export default function NavigationBar() {
	return (
		<nav className="grid w-full grid-cols-default py-[max(4vh_,3.5rem)]">
			<Link
				href="/"
				className="col-start-2 w-32 text-slate-1 opacity-90 transition-all hover:text-indigo-12 lg:mx-auto lg:w-32"
			>
				<Logo />
			</Link>
		</nav>
	)
}
