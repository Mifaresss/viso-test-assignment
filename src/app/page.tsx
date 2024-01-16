import { MapModule } from '@/modules/MapModule'
import s from './page.module.css'

export default function Home() {
	return (
		<main className={s.main}>
			<MapModule />
		</main>
	)
}
