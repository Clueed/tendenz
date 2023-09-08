'use client'
import React from 'react'
import { SWRConfig } from 'swr'

export async function fetcher<T>(url: string) {
	const res = await fetch(url)

	//console.info('res :>> ', res)

	// If the status code is not in the range 199-299,
	// we still try to parse and throw it.
	if (!res.ok) {
		console.warn('"error" :>> ', 'error')
		const error = new Error('An error occurred while fetching the data.')
		// Attach extra info to the error object.
		// error.info = await res.json();
		// error.status = res.status;
		throw error
	}

	return res.json() as T
}

// @ts-ignore
// function logger(useSWRNext) {
//   return (key, fetcher, config) => {
//     // Add logger to the original fetcher.
//     const extendedFetcher = (...args) => {
//       console.warn("SWR Request:", key);
//       return fetcher(...args);
//     };

//     // Execute the hook with the new fetcher.
//     return useSWRNext(key, extendedFetcher, config);
//   };
// }

export default function SWRConfigProvider({
	children,
	fallback,
}: {
	children: React.ReactNode
	fallback: any
}) {
	return (
		<SWRConfig
			value={{
				fallback,
				fetcher,
				revalidateIfStale: false,
				focusThrottleInterval: 60000,
			}}
		>
			{children}
		</SWRConfig>
	)
}

// function laggy(useSWRNext: SWRHook): Middleware {
// 	return (key, fetcher, config) => {
// 		// Use a ref to store previous returned data.
// 		const laggyDataRef = useRef()

// 		// Actual SWR hook.
// 		const swr = useSWRNext(key, fetcher, config)

// 		useEffect(() => {
// 			// Update ref if data is not undefined.
// 			if (swr.data !== undefined) {
// 				laggyDataRef.current = swr.data
// 			}
// 		}, [swr.data])

// 		// Expose a method to clear the laggy data, if any.
// 		const resetLaggy = useCallback(() => {
// 			laggyDataRef.current = undefined
// 		}, [])

// 		// Fallback to previous data if the current data is undefined.
// 		const dataOrLaggyData =
// 			swr.data === undefined ? laggyDataRef.current : swr.data

// 		// Is it showing previous data?
// 		const isLagging =
// 			swr.data === undefined && laggyDataRef.current !== undefined

// 		// Also add a `isLagging` field to SWR.
// 		return Object.assign({}, swr, {
// 			data: dataOrLaggyData,
// 			isLagging,
// 			resetLaggy,
// 		})
// 	}
// }
