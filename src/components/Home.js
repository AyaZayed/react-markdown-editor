import { signInAnonymously } from 'firebase/auth';
import { getFirebase } from '../firebase';

export default function Home() {
    const { auth } = getFirebase();

    function signIn() {
        signInAnonymously(auth).then(() => {
            window.location.href = '/dashboard';
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <main className='home-page'>
            <h1>Home</h1>
            <button onClick={signIn}>Sign In</button>
        </main>
    )
}