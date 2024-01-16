import { deepCompareEqualsForMaps } from '@/utils/deepCompareEqualsForMaps'
import { useRef } from 'react'

export function useDeepCompareMemoize(value: any) {
	const ref = useRef()

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value
	}

	return ref.current
}
