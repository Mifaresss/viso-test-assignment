'use client'
import { Map } from '@/components/Map'
import { Marker } from '@/components/Marker'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useState } from 'react'
import s from './page.module.css'

export default function Home() {
	const [clicks, setClicks] = useState<google.maps.LatLng[]>([])
	const [zoom, setZoom] = useState(3) // initial zoom
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({
		lat: 0,
		lng: 0,
	})

	const onClick = (e: google.maps.MapMouseEvent) => {
		// avoid directly mutating state
		setClicks([...clicks, e.latLng!])
	}

	const onIdle = (m: google.maps.Map) => {
		console.log('onIdle')
		setZoom(m.getZoom()!)
		setCenter(m.getCenter()!.toJSON())
	}

	return (
		<main className={s.main}>
			<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
				<Map onClick={onClick} onIdle={onIdle} zoom={zoom} center={center}>
					{clicks.map((latLng, i) => (
						<Marker key={i} position={latLng} />
					))}
				</Map>
			</Wrapper>
		</main>
	)
}
