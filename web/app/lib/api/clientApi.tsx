'use client'
import { stockTypeCode, tendenzApiSigmaYesterday } from '@tendenz/types'
import useSWR, { SWRResponse, preload } from 'swr'
import { fetcher } from './SWRConfigProvider'
import { getStocksURL } from './sharedApi'

export function useSigmaYesterday(
	minMarketCap: number,
	page: number = 0,
	stockTypes?: stockTypeCode[],
): SWRResponse<tendenzApiSigmaYesterday[], any, any> {
	const url = getStocksURL(page, minMarketCap, stockTypes)
	preload(getStocksURL(page + 1, minMarketCap, stockTypes), fetcher)

	return useSWR<tendenzApiSigmaYesterday[]>(url)
}
