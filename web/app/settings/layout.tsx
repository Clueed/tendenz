import Link from 'next/link'
import { ReactNode } from 'react'

export default function SettingsLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="grid grid-cols-default">
				<Link
					href={'/settings'}
					className="col-start-2 mb-[4vh] mt-[8vh] sm:mb-[6vh] sm:mt-[12vh]"
				>
					<h1 className="text-5xl font-normal text-slate-11 hover:text-indigo-11 sm:text-center">
						settings
					</h1>
				</Link>
			</header>
			{children}
		</>
	)
}
