import { Modal } from '@/ui/Modal'
import { Marker as DefaultMarker, MarkerProps } from '@vis.gl/react-google-maps'
import { useState } from 'react'

declare namespace Marker {
	interface Props extends MarkerProps {}
}

export function Marker({ onClick, ...props }: Marker.Props) {
	const [showModal, setShowModal] = useState(false)

	const onClickHandler = (e: google.maps.MapMouseEvent) => {
		onClick?.(e)
		setShowModal(true)
	}

	const onCancelHandler = () => {
		setShowModal(false)
	}

	return (
		<>
			<DefaultMarker onClick={onClickHandler} {...props}></DefaultMarker>
			<Modal isShowing={showModal} onCancel={onCancelHandler}>
				Удалить?
			</Modal>
		</>
	)
}
