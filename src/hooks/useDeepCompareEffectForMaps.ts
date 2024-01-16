import { EffectCallback, useEffect } from 'react'
import { useDeepCompareMemoize } from './useDeepCompareMemoize'

export function useDeepCompareEffectForMaps(
	callback: EffectCallback,
	dependencies: any[],
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
