import Link from 'next/link'
import { ReactNode } from 'react'
import ChevronRight from '../components/Sigma/ChevronRight'

export default function docs({ children }: { children: ReactNode }) {
	return (
		<>
			<div className="grid grid-cols-default pt-10">
				<h1 className="col-start-2 mb-5 flex items-baseline gap-5 text-5xl font-normal text-indigo-12 lg:text-center">
					<Link href="/docs" className="mt-1.5 inline rotate-180">
						<ChevronRight height="0.6em" />
					</Link>{' '}
					docs
				</h1>
			</div>
			{children}
		</>
	)
}


