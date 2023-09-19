'use client'

import { Ball } from './components/LoadingsBalls'

const colors = [
	'bg-skyA4',
	'bg-mintA4',
	'bg-indigoA5',
	'bg-violetA5',
	'bg-plumA5',
	'bg-irisA5',
	'bg-purpleA5',
	'bg-blueA5',
	'bg-cyanA5',
	'bg-pinkA5',
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
