import { db } from '@/firebase'
import { MARKERS_COLLECTION } from '@/firebase/collections'
import { Marker } from '@/modules/MapModule'
import { Button } from '@/ui/Button'
import { deleteDoc, doc } from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
import s from './index.module.css'

export declare namespace Options {
	interface Props {
		selectedMarkers: string[]
		setSelectedMarkers: Dispatch<SetStateAction<string[]>>
		markers: Marker[]
	}
}

export function Options({ selectedMarkers, setSelectedMarkers, markers }: Options.Props) {
	const deleteOneMarker = async () => {
		const docRef = doc(db, MARKERS_COLLECTION, selectedMarkers[0])
		await deleteDoc(docRef)
		// setMarkers(prev => prev.toSpliced(selectedMarkers[0], 1))
		setSelectedMarkers([])
	}

	const deleteAllMarkers = async () => {
		const docRefs = markers.map(m => doc(db, MARKERS_COLLECTION, m.id))
		await Promise.all(docRefs.map(docRef => deleteDoc(docRef)))
		// delete setMarkers([])
	}

	return (
		<div className={s.wrapper}>
			<p>
				Select markers by clicking on them. Press{' '}
				<span style={{ fontWeight: 500 }}>Ctrl</span> to select several
			</p>
			<div className={s.buttons}>
				<Button onClick={deleteOneMarker} disabled={selectedMarkers.length !== 1}>
					Delete selected marker
				</Button>
				<Button onClick={deleteAllMarkers} disabled={!markers.length}>
					Delete all markers
				</Button>
			</div>
		</div>
	)
}
