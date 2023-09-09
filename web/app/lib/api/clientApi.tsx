'use client'
import { FilterContext } from '@/app/components/FilterContextProvider'
import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { useContext } from 'react'
import useSWR, { SWRResponse, preload } from 'swr'
import useSWRInfinite from 'swr/infinite'
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

export function useSigmaYesterdayInfinite() {
	const { marketCap, typeLabels } = useContext(FilterContext)
	//const url = getStocksURL({ marketCap, typeLabels, page: pageIndex })
	//preload(getStocksURL({ marketCap, typeLabels, page: pageIndex + 1 }), fetcher)

	return useSWRInfinite<tendenzApiSigmaYesterday[]>(
		(pageIndex, previousPageData) => {
			if (previousPageData && !previousPageData.length) return null
			return getStocksURL({ page: pageIndex, marketCap, typeLabels })
		},
	)
}
