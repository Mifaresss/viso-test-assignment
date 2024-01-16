import { Button } from '@/ui/Button'
import { AdvancedMarkerProps } from '@vis.gl/react-google-maps'
import { Dispatch, SetStateAction } from 'react'
import s from './index.module.css'

export declare namespace Options {
	interface Props {
		selectedMarkers: number[]
		setSelectedMarkers: Dispatch<SetStateAction<number[]>>
		markers: AdvancedMarkerProps[]
		setMarkers: Dispatch<SetStateAction<AdvancedMarkerProps[]>>
	}
}

export function Options({
	selectedMarkers,
	setSelectedMarkers,
	markers,
	setMarkers,
}: Options.Props) {
	const deleteOneMarker = () => {
		setMarkers(prev => prev.toSpliced(selectedMarkers[0], 1))
		setSelectedMarkers([])
	}

	const deleteAllMarkers = () => {
		setMarkers([])
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
