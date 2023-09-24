import { tendenzApiSigmaYesterday } from '@tendenz/types'
import { createContext } from 'react'

export const SigmaEntryContext = createContext<tendenzApiSigmaYesterday>({
	sigma: 7.039612717646644,
	marketCap: 1709557023.13,
	ticker: 'RCKT',
	name: 'Rocket Pharmaceuticals, Inc.',
	type: 'CS',
	primaryExchange: 'XNAS',
	last: {
		close: 21.23,
		date: '2023-09-13T20:00:00.000Z',
	},
	secondLast: {
		close: 15.29,
		date: '2023-09-12T20:00:00.000Z',
	},
})
