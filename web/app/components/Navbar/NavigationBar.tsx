import Link from 'next/link'
import { Logo } from './Logo'

export default function NavigationBar() {
	return (
		<nav className="grid w-full grid-cols-default py-[max(5vh_,3rem)]">
			<Link
				href="/"
				className="col-start-2 w-[10rem] rounded-lg bg-indigo-a3 py-4 pl-6 pr-7 text-indigo-12 transition-all hover:bg-indigo-a5 hover:text-indigo-12 hover:shadow-xl lg:mx-auto"
			>
				<Logo />
			</Link>
		</nav>
	)
}
