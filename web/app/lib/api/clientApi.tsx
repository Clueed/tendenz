'use client'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import useSWR, { SWRResponse, preload } from 'swr'
import { fetcher } from './SWRConfigProvider'
import { ApiQuery, getStocksURL } from './sharedApi'

export function useSigmaYesterday(
	query?: ApiQuery,
): SWRResponse<tendenzApiSigmaYesterday[], any, any> {
	const url = getStocksURL(query)
	const { page, ...rest } = query ?? {}
	preload(getStocksURL({ ...rest, page: page || 1 }), fetcher)

	return useSWR<tendenzApiSigmaYesterday[]>(url)
}
