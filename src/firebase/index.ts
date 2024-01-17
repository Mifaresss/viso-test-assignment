import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDjDW8gAWtQpl1B28hf_-hitJbcjCK9zH4',
	authDomain: 'map-markers-411412.firebaseapp.com',
	databaseURL:
		'https://map-markers-411412-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'map-markers-411412',
	storageBucket: 'map-markers-411412.appspot.com',
	messagingSenderId: '109401018958',
	appId: '1:109401018958:web:5fc03d73cda7007df3291f',
	measurementId: 'G-SRL1Q2LGPQ',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore()
