import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import { createCustomEqual } from 'fast-equals'

export const deepCompareEqualsForMaps = createCustomEqual(
	// @ts-ignore TODO: Find out what type is needed here
	(deepEqual: any) => (a: any, b: any) => {
		if (
			isLatLngLiteral(a) ||
			a instanceof google.maps.LatLng ||
			isLatLngLiteral(b) ||
			b instanceof google.maps.LatLng
		) {
			return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
		}

		return deepEqual(a, b)
	},
)
