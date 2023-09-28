import { useEffect, useRef, useState } from 'react'
import { useSigmaYesterdayInfinite } from './useSigmaYesterdayInfinite'

export function useLoadingAnimation() {
	const [loadingAnimation, setLoadingAnimation] = useState<boolean>(false)

	const { isLoadingMore } = useSigmaYesterdayInfinite()
	const isMounted = useRef(false)
	useEffect(() => {
		if (isMounted.current) {
			setLoadingAnimation(true)
		} else {
			isMounted.current = true
		}
	}, [isLoadingMore])

	const handleAnimationIteration = () =>
		!isLoadingMore && setLoadingAnimation(false)

	return {
		loadingAnimation,
		handleAnimationIteration,
	}
}
