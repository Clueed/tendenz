import useSWR, { SWRResponse } from 'swr'

export interface tendenzApiSigmaYesterdayDay {
	close: number
	logReturn: number
	date: string
}

export interface tendenzApiSigmaYesterday {
	ticker: string
	name: string | null
	sigma: number
	weight: number
	marketCap: number
	stdLogReturn: number
	meanLogReturn: number
	sampleSize: number
	last: tendenzApiSigmaYesterdayDay
	secondLast: tendenzApiSigmaYesterdayDay
}

async function getData<T>(url: string) {
	try {
		const res = await fetch(url, {
			next: { revalidate: 600 },
		})
		return res.json() as Promise<T>
	} catch (e) {
		console.error(e)
		return []
	}
}

const getURL = (page: number, minMarketCap: number) =>
	`https://tendenz-server.fly.dev/${page}?minMarketCap=${minMarketCap}`

export async function getFallback(minMarketCaps: number[], page: number = 0) {
	let fallback: { [key: string]: tendenzApiSigmaYesterday[] } = {}

	await Promise.all(
		minMarketCaps.map(async minMarketCap => {
			const url = getURL(page, minMarketCap)
			fallback[url] = await getData<tendenzApiSigmaYesterday[]>(url)
		}),
	)

	return fallback
}

export function useSigmaYesterday(
	minMarketCap: number,
	page: number = 0,
): SWRResponse<tendenzApiSigmaYesterday[], any, any> {
	const url = getURL(page, minMarketCap)

	return useSWR<tendenzApiSigmaYesterday[]>(url)
}
