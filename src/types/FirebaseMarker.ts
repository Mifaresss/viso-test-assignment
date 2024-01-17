export type FirebaseMarker = {
	readonly id: string
	location: {
		_lat: number
		_long: number
	}
	timestamp: number
	next?: string
}

export type FirebaseMarkerNew = Partial<FirebaseMarker>
