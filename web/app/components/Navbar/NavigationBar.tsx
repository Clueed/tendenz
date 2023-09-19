import Link from 'next/link'
import ColorThemeButton from './ColorThemeButton'
import { Logo } from './Logo'

export default function NavigationBar() {
	return (
		<nav className="grid w-full grid-cols-default pt-[max(4vh_,3.5rem)]">
			<div className="col-start-2 flex justify-between">
				<Link
					aria-label="homepage"
					href="/"
					className="w-32 text-slate1 opacity-90 transition-all hover:text-indigo12 sm:mx-auto sm:w-32"
				>
					<Logo />
				</Link>
				<ColorThemeButton />
			</div>
		</nav>
	)
}
