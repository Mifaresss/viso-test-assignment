'use client'
import { Map } from '@/components/Map'
import { Marker } from '@/components/Marker'
import { APIProvider, MarkerProps } from '@vis.gl/react-google-maps'
import { useState } from 'react'
import s from './page.module.css'
import { MapMouseEvent } from './types/MapEventProps'

export default function Home() {
	const [markers, setMarkers] = useState<MarkerProps[]>([])

	const onClickMapHandler = (e: MapMouseEvent) => {
		setMarkers([...markers, { position: e.detail.latLng }])
	}

	return (
		<main className={s.main}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
				<div style={{ width: '500px', height: '500px', margin: 'auto' }}>
					<Map onClick={onClickMapHandler}>
						{markers.map((marker, i) => (
							<Marker key={i} position={marker.position} draggable />
						))}
					</Map>
				</div>
			</APIProvider>
		</main>
	)
}
