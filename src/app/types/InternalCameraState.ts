import { MutableRefObject } from 'react'

export type InternalCameraState = {
	center: google.maps.LatLngLiteral
	heading: number
	tilt: number
	zoom: number
}

export type InternalCameraStateRef = MutableRefObject<InternalCameraState>
