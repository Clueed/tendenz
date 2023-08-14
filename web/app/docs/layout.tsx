import { ReactNode } from 'react'

export default function docs({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="grid grid-cols-default">
				<h1 className="col-start-2 my-[6vh] text-5xl font-normal text-indigo-12 sm:my-[12.5vh] lg:text-center">
					docs
				</h1>
			</header>
			{children}
		</>
	)
}
