"use client";
import useSWR, { SWRResponse } from 'swr'
import { getStocksURL, tendenzApiSigmaYesterday } from './sharedApi';

export function useSigmaYesterday(
	minMarketCap: number,
	page: number = 0,
): SWRResponse<tendenzApiSigmaYesterday[], any, any> {
	const url = getStocksURL(page, minMarketCap)

	return useSWR<tendenzApiSigmaYesterday[]>(url)
}
