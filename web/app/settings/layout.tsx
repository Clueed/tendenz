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
					<h1 className="text-5xl font-normal text-slate11 hover:text-indigo11 sm:text-center">
						settings
					</h1>
				</Link>
			</header>
			<div className="grid grid-cols-default [&>*]:col-start-2">{children}</div>
		</>
	)
}
