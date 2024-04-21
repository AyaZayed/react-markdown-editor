import React, { useEffect } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'

export default function Home() {

    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            }
        });
    }, [])

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
