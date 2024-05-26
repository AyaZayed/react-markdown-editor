import React, { useContext } from 'react'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { FirebaseContext } from '../FirebaseContext'


export default function Home() {
    const firebaseApp = useContext(FirebaseContext)
    const auth = getAuth(firebaseApp)

    function signIn() {
        signInAnonymously(auth);
        window.location.href = '/dashboard'
    }

    return (
        <main className='home-page'>
            <h1>Home</h1>
            <button onClick={signIn}>Sign In</button>
        </main>
    )
}
