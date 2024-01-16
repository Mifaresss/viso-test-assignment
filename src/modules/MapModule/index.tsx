'use client'
import { MapMouseEvent } from '@/app/types/MapEventProps'
import { Map } from '@/components/Map'
import { Marker } from '@/components/Marker'
import { APIProvider, MarkerProps } from '@vis.gl/react-google-maps'
import { useState } from 'react'

export function MapModule() {
	const [markers, setMarkers] = useState<MarkerProps[]>([])
	const [isShowingModal, setIsShowingModal] = useState(false)

	const onClickMapHandler = (e: MapMouseEvent) => {
		console.log('onClickMapHandler')
		setMarkers([...markers, { position: e.detail.latLng }])
	}

	const onClickMarkerHandler = (e: google.maps.MapMouseEvent, i: number) => {
		console.log('onClickMarker')
		// setIsShowingModal(!isShowingModal)
	}

	return (
		<div style={{ width: '500px', height: '500px', margin: 'auto' }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
				<Map onClick={onClickMapHandler}>
					{markers.map((marker, i) => (
						<Marker
							key={i}
							onClick={e => {
								onClickMarkerHandler(e, i)
							}}
							position={marker.position}
							draggable
						/>
					))}
				</Map>
			</APIProvider>
		</div>
	)
}
