import { Marker as DefaultMarker, MarkerProps } from '@vis.gl/react-google-maps'

declare namespace Marker {
	interface Props extends MarkerProps {}
}

export function Marker({ ...props }: Marker.Props) {
	return <DefaultMarker {...props}></DefaultMarker>
}
