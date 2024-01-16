import { useDeepCompareEffectForMaps } from '@/hooks/useDeepCompareEffectForMaps'
import {
	Attributes,
	Children,
	ReactNode,
	cloneElement,
	isValidElement,
	useEffect,
	useRef,
	useState,
} from 'react'
import { darkThemeStyles as styles } from './darkThemeStyles'
import s from './index.module.css'

declare namespace Map {
	interface Props extends google.maps.MapOptions {
		onClick?: (e: google.maps.MapMouseEvent) => void
		onIdle?: (map: google.maps.Map) => void
		children?: ReactNode
	}
}

export function Map({ onClick, onIdle, children, ...options }: Map.Props) {
	const ref = useRef<HTMLDivElement>(null)
	const [map, setMap] = useState<google.maps.Map | null>(null)

	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, { styles }))
		}
	}, [ref, map])

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options)
		}
	}, [map, options])

	useEffect(() => {
		if (map) {
			const clickIdle = ['click', 'idle']
			clickIdle.forEach(e => google.maps.event.clearListeners(map, e))

			if (onClick) {
				map.addListener('click', onClick)
			}

			if (onIdle) {
				map.addListener('idle', () => onIdle(map))
			}
		}
	}, [map, onClick, onIdle])

	return (
		<div className={s.wrapper}>
			<div
				ref={ref}
				style={{ flexGrow: 1, height: '100%', borderRadius: 'var(--border-radius)' }}
			/>
			{Children.map(children, child => {
				if (isValidElement(child)) {
					return cloneElement(child, { map } as Attributes)
				}
			})}
		</div>
	)
}
