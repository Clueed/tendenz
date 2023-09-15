'use client'

import { Ball } from './components/LoadingsBalls'

const colors = [
	'bg-sky-a4',
	'bg-mint-a4',
	'bg-indigo-a5',
	'bg-violet-a5',
	'bg-plum-a5',
	'bg-iris-a5',
	'bg-purple-a5',
	'bg-blue-a5',
	'bg-cyan-a5',
	'bg-pink-a5',
]

export default function NotFound() {
	return (
		<div className="mt-[45vh] flex h-full w-full -translate-y-full items-center justify-center">
			<div>
				<h2 className="text-xl">404</h2>
				<p>This page could not be found.</p>
				<div className="absolute inset-0 -z-10 flex items-center justify-center">
					<Ball
						className="translate-x-0"
						colorClassNameList={colors}
						sizeClassName="w-40"
					/>
					<Ball
						className="translate-x-10"
						colorClassNameList={colors}
						sizeClassName="w-40"
					/>
					<Ball
						className="-translate-x-10"
						colorClassNameList={colors}
						sizeClassName="w-40"
					/>
				</div>
			</div>
		</div>
	)
}
