'use client'
import { Map } from '@/components/Map'
import { Options } from '@/components/Options'
import { db } from '@/firebase'
import { MARKERS_COLLECTION } from '@/firebase/collections'
import { FirebaseMarker, FirebaseMarkerNew } from '@/types/FirebaseMarker'
import {
	APIProvider,
	AdvancedMarker,
	AdvancedMarkerProps,
	MapProps,
	Pin,
} from '@vis.gl/react-google-maps'
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import s from './index.module.css'

export type Marker = AdvancedMarkerProps & {
	id: string
	timestamp: number
	next?: string
}

export function MapModule() {
	const [markers, setMarkers] = useState<Marker[]>([])
	const [selectedMarkerIds, setSelectedMarkerIds] = useState<string[]>([])
	const [isDragging, setisDragging] = useState(false) // to avoid library error with unnecessary map click

	useEffect(
		() =>
			onSnapshot(collection(db, MARKERS_COLLECTION), snapshot => {
				const fromResponse: FirebaseMarker[] = snapshot.docs.map(doc => ({
					id: doc.id,
					...(doc.data() as any),
				}))
				const newMarkers: Marker[] = fromResponse.map(doc => ({
					id: doc.id,
					position: { lat: doc.location._lat, lng: doc.location._long },
					timestamp: doc.timestamp,
					next: doc.next,
				}))
				setMarkers(newMarkers)
			}),
		[],
	)

	const onClickMapHandler: MapProps['onClick'] = async e => {
		if (isDragging) {
			setisDragging(false)
			return
		}
		const collectionRef = collection(db, MARKERS_COLLECTION)
		const payload: FirebaseMarkerNew = {
			location: {
				_lat: e.detail.latLng?.lat as number,
				_long: e.detail.latLng?.lng as number,
			},
			timestamp: new Date().getTime(),
		}
		await addDoc(collectionRef, payload)
	}

	const onClickMarkerHandler = (e: google.maps.MapMouseEvent, id: string) => {
		if ('ctrlKey' in e.domEvent && e.domEvent.ctrlKey) {
			if (selectedMarkerIds.includes(id)) {
				setSelectedMarkerIds(selectedMarkerIds.filter(markerId => markerId !== id))
			} else {
				setSelectedMarkerIds([...selectedMarkerIds, id])
			}
		} else {
			if (selectedMarkerIds.includes(id)) {
				setSelectedMarkerIds([])
			} else {
				setSelectedMarkerIds([id])
			}
		}
	}

	const onDragEndHandler = (e: google.maps.MapMouseEvent, id: string) => {
		const docRef = doc(db, MARKERS_COLLECTION, id)
		const payload: FirebaseMarkerNew = {
			location: { _lat: e.latLng?.lat() as number, _long: e.latLng?.lng() as number },
			timestamp: new Date().getTime(),
		}
		setDoc(docRef, payload)
	}

	return (
		<div className={s.mapModule}>
			<Options
				selectedMarkers={selectedMarkerIds}
				setSelectedMarkers={setSelectedMarkerIds}
				markers={markers}
			/>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
				<Map onClick={onClickMapHandler}>
					{markers.map((marker, i) => {
						const prevMarker = markers[i - 1]
						if (prevMarker) {
							if (!prevMarker.next) {
								const docRef = doc(db, MARKERS_COLLECTION, prevMarker.id)
								const payload: FirebaseMarker = {
									id: prevMarker.id,
									location: {
										_lat: prevMarker.position?.lat as number,
										_long: prevMarker.position?.lng as number,
									},
									timestamp: prevMarker.timestamp,
									next: marker.id,
								}
								setDoc(docRef, payload)
							}
						}

						return (
							<AdvancedMarker
								key={marker.id}
								draggable
								position={marker.position}
								onClick={e => {
									onClickMarkerHandler(e, marker.id)
								}}
								onDragStart={() => {
									setisDragging(true)
								}}
								onDragEnd={e => {
									onDragEndHandler(e, marker.id)
								}}
							>
								<Pin
									background={
										selectedMarkerIds.includes(marker.id) ? '#FBBC04' : null
									}
									glyphColor={'#000'}
									borderColor={'#000'}
								/>
							</AdvancedMarker>
						)
					})}
				</Map>
			</APIProvider>
		</div>
	)
}
