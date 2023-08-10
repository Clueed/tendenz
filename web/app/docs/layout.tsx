import { ReactNode } from 'react'

export default function docs({ children }: { children: ReactNode }) {
	return (
		<>
			<div className="grid grid-cols-default">
				<h1 className="col-start-2 mb-[9vh] mt-[4.5vh] text-5xl font-normal text-indigo-12 lg:text-center">
					docs
				</h1>
			</div>
			{children}
		</>
	)
}
