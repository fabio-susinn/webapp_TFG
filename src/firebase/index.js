// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.VITE_FIRESTORE_API_KEY,
  authDomain: 'tfg-fabiosusin.firebaseapp.com',
  projectId: 'tfg-fabiosusin',
  storageBucket: 'tfg-fabiosusin.appspot.com',
  messagingSenderId: '815717238645',
  appId: '1:815717238645:web:88fb2e1ee6b0d99447353c',
  measurementId: 'G-SLS4PR3SDL'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
