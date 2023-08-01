import { ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'

export function H2({ children }: { children: ReactNode }) {
	return (
		<h2 className="col-start-2 mt-5 text-3xl font-normal text-indigo-11 lg:text-center">
			<Balancer>{children}</Balancer>
		</h2>
	)
}

export function H3({ children }: { children: ReactNode }) {
	return (
		<h3 className="col-start-2 mt-4 text-2xl font-normal text-indigo-11 lg:text-center">
			<Balancer>{children}</Balancer>
		</h3>
	)
}

export function P({ children }: { children: ReactNode }) {
	return (
		<p className="col-start-2 mt-2 leading-loose text-slate-12">{children}</p>
	)
}

export function UL({ children }: { children: ReactNode }) {
	return <ul className="list-inside list-disc">{children}</ul>
}

export function LI({ children }: { children: ReactNode }) {
	return <li className="mb-2">{children}</li>
}

export function B({ children }: { children: ReactNode }) {
	return <b className="font-medium">{children}</b>
}
