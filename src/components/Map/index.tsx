import { Map as DefaultMap, MapProps } from '@vis.gl/react-google-maps'
import { ReactNode } from 'react'

declare namespace Map {
	interface Props extends MapProps {
		children?: ReactNode
	}
}

const defaultZoomLevel = 3

export function Map({
	mapId,
	zoom,
	center,
	disableDefaultUI,
	children,
	...props
}: Map.Props) {
	return (
		<DefaultMap
			mapId={mapId ?? process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
			zoom={zoom ?? defaultZoomLevel}
			center={center ?? { lat: 22.54992, lng: 0 }}
			disableDefaultUI={disableDefaultUI ?? true}
			{...props}
		>
			{children}
		</DefaultMap>
	)
}
