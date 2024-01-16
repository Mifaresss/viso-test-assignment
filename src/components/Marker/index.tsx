import { useEffect, useState } from 'react'

export function Marker(options: google.maps.MarkerOptions) {
	const [marker, setMarker] = useState<google.maps.Marker | null>(null)

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker())
		}

		return () => {
			if (marker) {
				marker.setMap(null)
			}
		}
	}, [marker])

	useEffect(() => {
		if (marker) {
			marker.setOptions(options)
		}
	}, [marker, options])

	return null
}
