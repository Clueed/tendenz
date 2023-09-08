import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { ApiQuery, getStocksURL } from './sharedApi'

const cacheInterval = Number(process.env.REVALIDATE_INTERVAL) ?? 600

console.debug('Next cache interval:', cacheInterval, 's')

async function getData<T>(url: string) {
	const res = await fetch(url, {
		next: { revalidate: cacheInterval },
	})
	return res.json() as Promise<T>
}

export async function getFallback(queries: ApiQuery[]) {
	let fallback: { [key: string]: tendenzApiSigmaYesterday[] } = {}

	await Promise.all(
		queries.map(async query => {
			const url = getStocksURL(query)
			try {
				fallback[url] = await getData<tendenzApiSigmaYesterday[]>(url)
			} catch (e) {
				console.error(e)
			}
		}),
	)

	return fallback
}
