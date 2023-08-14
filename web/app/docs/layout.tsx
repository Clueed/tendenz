import Link from 'next/link'
import { ReactNode } from 'react'

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="grid grid-cols-default">
				<Link
					href={'/docs'}
					className="col-start-2 mb-[3vh] mt-[6vh] sm:mb-[6vh] sm:mt-[12vh]"
				>
					<h1 className="text-5xl font-normal text-indigo-12  lg:text-center">
						docs
					</h1>
				</Link>
			</header>
			{children}
		</>
	)
}
