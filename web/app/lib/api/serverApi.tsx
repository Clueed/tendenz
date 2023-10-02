import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { unstable_serialize } from 'swr/infinite'
import { ApiCall, getStocksURL } from './sharedApi'

export const cacheInterval = Number(process.env.REVALIDATE_INTERVAL) ?? 600

console.debug('Next cache interval:', cacheInterval, 's')

async function getData<T>(url: string) {
	const res = await fetch(url, {
		next: { revalidate: cacheInterval },
	})
	return res.json() as Promise<T>
}

export async function getFallback(queries: ApiCall[]) {
	let fallback: { [key: string]: tendenzApiSigmaYesterday[][] } = {}

	await Promise.all(
		queries.map(async ({ marketCap, typeLabels }) => {
			const url = getStocksURL({ marketCap, typeLabels, page: 0 })
			const key = unstable_serialize(pageIndex =>
				getStocksURL({ marketCap, typeLabels, page: pageIndex }),
			)
			try {
				const data = await getData<tendenzApiSigmaYesterday[]>(url)
				fallback[key] = [data]
			} catch (e) {
				console.error(e)
			}
		}),
	)

	return fallback
}
