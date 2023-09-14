import { useContext } from 'react'
import { SigmaEntryContext } from './SigmaEntryContext'

export function useOffRampUrl() {
	const { type, primaryExchange, ticker } = useContext(SigmaEntryContext)
	if (true) {
		const param = type === 'ETF' ? `etf` : `${primaryExchange}`

		return `https://wallmine.com/${param}/${ticker}`
	}
}
