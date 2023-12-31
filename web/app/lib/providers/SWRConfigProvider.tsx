'use client'
import React from 'react'
import { SWRConfig } from 'swr'

export async function fetcher<T>(url: string) {
	const res = await fetch(url)

	//console.info('res :>> ', res)

	// If the status code is not in the range 199-299,
	// we still try to parse and throw it.
	if (!res.ok) {
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
				focusThrottleInterval: 60000,
				keepPreviousData: true,
				//revalidateOnMount: false,
			}}
		>
			{children}
		</SWRConfig>
	)
}
