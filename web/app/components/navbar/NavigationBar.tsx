import Link from 'next/link'
import ColorThemeButton from './ColorThemeButton'
import { Logo } from './Logo'

export default function NavigationBar() {
	return (
		<nav className="grid w-full grid-cols-default pt-[max(4vh_,3.5rem)]">
			<div className="col-start-2 grid grid-cols-2 sm:grid-cols-3">
				<Link
					aria-label="homepage"
					href="/"
					className="w-32 text-slate1 opacity-90 transition-colors hover:text-indigo12 sm:col-start-2 sm:w-32 sm:place-self-center"
				>
					<Logo />
				</Link>
				<ColorThemeButton className="place-self-end" />
			</div>
		</nav>
	)
}
