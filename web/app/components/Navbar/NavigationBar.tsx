import Link from 'next/link'
import { Logo } from './Logo'

export default function NavigationBar() {
	return (
		<nav className="flex w-full items-center justify-start pt-[4vh] lg:justify-center">
			<Link
				href="/"
				className="w-[6.6rem] rounded-r-xl text-slate-12 transition-all hover:text-indigo-11"
			>
				<Logo />
			</Link>
		</nav>
	)
}
