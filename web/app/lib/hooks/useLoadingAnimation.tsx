import { useSigmaYesterdayInfinite } from '@/app/lib/hooks/useSigmaYesterdayInfinite'
import { useFilterStore } from '@/app/lib/stores/filterStore'
import { useEffect, useRef, useState } from 'react'

export function useLoadingAnimation() {
	const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)

	const filterStore = useFilterStore()

	const { isLoadingMore } = useSigmaYesterdayInfinite()

	const isMounted = useRef(false)
	useEffect(() => {
		if (isMounted.current) {
			setLoadingAnimation(true)
		} else {
			isMounted.current = true
		}
	}, [filterStore])

	const handleAnimationIteration = () =>
		!isLoadingMore && setLoadingAnimation(false)

	return {
		loadingAnimation,
		handleAnimationIteration,
	}
}
