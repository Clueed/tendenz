'use client'
import { FilterContext } from '@/app/components/FilterContextProvider'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { useContext } from 'react'
import useSWR, { SWRResponse, preload } from 'swr'
import { fetcher } from './SWRConfigProvider'
import { getStocksURL } from './sharedApi'

export function useSigmaYesterday(
	pageIndex: number,
): SWRResponse<tendenzApiSigmaYesterday[], any, any> {
	const { marketCap, typeLabels } = useContext(FilterContext)
	const url = getStocksURL({ marketCap, typeLabels, page: pageIndex })
	preload(getStocksURL({ marketCap, typeLabels, page: pageIndex + 1 }), fetcher)

	return useSWR<tendenzApiSigmaYesterday[]>(url)
}
