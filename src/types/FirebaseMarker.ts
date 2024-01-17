export type FirebaseMarker = {
	readonly id: string
	location: {
		_lat: number
		_long: number
	}
	timestamp: {
		seconds: number
		nanoseconds: number
	}
}

export type FirebaseMarkerNew = Partial<FirebaseMarker>
