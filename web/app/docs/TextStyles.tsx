import classNames from 'classnames'
import { ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'

export function H2({ children }: { children: ReactNode }) {
	return (
		<h2 className="col-start-2 text-5xl font-normal text-indigo-11 sm:mb-[2vh] sm:text-center">
			<Balancer>{children}</Balancer>
		</h2>
	)
}

export function H3({ children }: { children: ReactNode }) {
	return (
		<h3 className="col-start-2 mt-10 text-3xl font-normal text-indigo-11 sm:mb-[1vh] sm:mt-[6vh] sm:text-center">
			<Balancer>{children}</Balancer>
		</h3>
	)
}

export function P({ children }: { children: ReactNode }) {
	return <p className="col-start-2 mt-5 text-slate-12">{children}</p>
}

export function UL({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<ul
			className={classNames(
				'col-start-2 ml-8 mt-2 list-inside list-disc text-slate-12',
				className,
			)}
		>
			{children}
		</ul>
	)
}

export function OL({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<ol
			className={classNames(
				'col-start-2 ml-8 mt-2 list-inside list-decimal text-slate-12',
				className,
			)}
		>
			{children}
		</ol>
	)
}

export function LI({ children }: { children: ReactNode }) {
	return <li className="mb-2">{children}</li>
}

export function B({ children }: { children: ReactNode }) {
	return <b className="font-medium">{children}</b>
}
