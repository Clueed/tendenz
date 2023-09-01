'use client'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import useSWR, { SWRResponse, preload } from 'swr'
import { fetcher } from './SWRConfigProvider'
import { getStocksURL } from './sharedApi'

export function useSigmaYesterday(
	minMarketCap: number,
	page: number = 0,
): SWRResponse<tendenzApiSigmaYesterday[], any, any> {
	const url = getStocksURL(page, minMarketCap)
	preload(getStocksURL(page + 1, minMarketCap), fetcher)

	return useSWR<tendenzApiSigmaYesterday[]>(url)
}
