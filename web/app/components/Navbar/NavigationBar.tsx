import Link from 'next/link'
import { Logo } from './Logo'

export default function NavigationBar() {
	return (
		<nav className="sticky top-0 z-50 flex w-full items-center justify-start pt-5 lg:justify-center">
			<Link
				href="/"
				className="w-[8.1rem] rounded-r-xl bg-slate-a12 py-4 pl-6 pr-7 text-slate-1 shadow-2xl lg:rounded-l-xl"
			>
				<Logo />
			</Link>
		</nav>
	)
}
