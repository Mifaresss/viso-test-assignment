'use client'
import { Map } from '@/components/Map'
import { Options } from '@/components/Options'
import {
	APIProvider,
	AdvancedMarker,
	AdvancedMarkerProps,
	MapProps,
	Pin,
} from '@vis.gl/react-google-maps'
import { useState } from 'react'
import s from './index.module.css'

export function MapModule() {
	const [markers, setMarkers] = useState<AdvancedMarkerProps[]>([])
	const [selectedMarkers, setSelectedMarkers] = useState<number[]>([])
	const [isDragging, setisDragging] = useState(false) // to avoid library error with unnecessary map click

	const onClickMapHandler: MapProps['onClick'] = e => {
		if (isDragging) {
			setisDragging(false)
			return
		}
		setMarkers([...markers, { position: e.detail.latLng }])
	}

	const onClickMarkerHandler = (e: google.maps.MapMouseEvent, i: number) => {
		if ('ctrlKey' in e.domEvent && e.domEvent.ctrlKey) {
			if (selectedMarkers.includes(i)) {
				setSelectedMarkers(selectedMarkers.filter(m => m !== i))
			} else {
				setSelectedMarkers([...selectedMarkers, i])
			}
		} else {
			if (selectedMarkers.includes(i)) {
				setSelectedMarkers([])
			} else {
				setSelectedMarkers([i])
			}
		}
	}

	const onDragEndHandler = (e: google.maps.MapMouseEvent, i: number) => {
		setMarkers(markers.toSpliced(i, 1, { position: e.latLng }))
	}

	return (
		<div className={s.mapModule}>
			<Options
				selectedMarkers={selectedMarkers}
				setSelectedMarkers={setSelectedMarkers}
				markers={markers}
				setMarkers={setMarkers}
			/>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
				<Map onClick={onClickMapHandler}>
					{markers.map((marker, i) => (
						<AdvancedMarker
							key={i}
							draggable
							position={marker.position}
							onClick={e => {
								onClickMarkerHandler(e, i)
							}}
							onDragStart={() => {
								setisDragging(true)
							}}
							onDragEnd={e => {
								onDragEndHandler(e, i)
							}}
						>
							<Pin
								background={selectedMarkers.includes(i) ? '#FBBC04' : null}
								glyphColor={'#000'}
								borderColor={'#000'}
							/>
						</AdvancedMarker>
					))}
				</Map>
			</APIProvider>
		</div>
	)
}
