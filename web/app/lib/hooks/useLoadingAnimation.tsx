import { useEffect, useRef, useState } from 'react'
import { useSigmaYesterdayInfinite } from '../api/clientApi'
import { useFilterStore } from '../stores/filterStore'

export function useLoadingAnimation() {
	const marketCap = useFilterStore(state => state.marketCap)
	const typeLabels = useFilterStore(state => state.typeLabels)
	const { size, isLoadingMore } = useSigmaYesterdayInfinite()

	const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)

	const isMounted = useRef(false)

	useEffect(() => {
		if (isMounted.current) {
			setLoadingAnimation(true)
		} else {
			isMounted.current = true
		}
	}, [marketCap, typeLabels, size])

	const handleAnimationIteration = () =>
		!isLoadingMore && setLoadingAnimation(false)

	return {
		loadingAnimation,
		handleAnimationIteration,
	}
}
