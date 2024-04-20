import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import React from 'react'

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const FirebaseContext = React.createContext()

export { firebaseApp, FirebaseContext }