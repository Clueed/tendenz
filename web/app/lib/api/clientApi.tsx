'use client'

import { useFilterStore } from '@/app/lib/stores/filterStore'
import { PAGE_SIZE, tendenzApiSigmaYesterday } from '@tendenz/types'
import { useMemo } from 'react'
import { preload } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../../components/SWRConfigProvider'
import { getStocksURL } from './sharedApi'

export function useSigmaYesterdayInfinite() {
	const marketCap = useFilterStore(state => state.marketCap)
	const typeLabels = useFilterStore(state => state.typeLabels)

	const res = useSWRInfinite<tendenzApiSigmaYesterday[]>(
		(pageIndex, previousPageData) => {
			if (previousPageData && !previousPageData.length) return null
			preload(
				getStocksURL({ marketCap, typeLabels, page: pageIndex + 1 }),
				fetcher,
			)
			return getStocksURL({ page: pageIndex, marketCap, typeLabels })
		},
	)

	const { data, size, isLoading } = res

	const flatData = useMemo(
		() => (data ? ([] as tendenzApiSigmaYesterday[]).concat(...data) : []),
		[data],
	)

	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

	return { flatData, isLoadingMore, isEmpty, isReachingEnd, ...res }
}
