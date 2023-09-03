import { stockTypeCode, tendenzApiSigmaYesterday } from '@tendenz/types'
import { getStocksURL } from './sharedApi'

async function getData<T>(url: string) {
	const res = await fetch(url, {
		//next: { revalidate: 600 },
	})
	return res.json() as Promise<T>
}

export async function getFallback(
	minMarketCaps: number[],
	types?: stockTypeCode[],
	page: number = 0,
) {
	let fallback: { [key: string]: tendenzApiSigmaYesterday[] } = {}

	await Promise.all(
		minMarketCaps.map(async minMarketCap => {
			const url = getStocksURL(page, minMarketCap, types)
			try {
				fallback[url] = await getData<tendenzApiSigmaYesterday[]>(url)
			} catch (e) {
				console.error(e)
			}
		}),
	)

	return fallback
}
