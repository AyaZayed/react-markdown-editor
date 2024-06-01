import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getFirebase } from '../firebase';
import { onSnapshot, collection, setDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
    const [markdowns, setMarkdowns] = useState([])
    const [userId, setUserId] = useState('')

    // get all documents
    const { firestore, auth } = getFirebase();
    const markdownsCol = collection(firestore, 'markdowns');

    onAuthStateChanged(auth, user => {
        if (user) {
            setUserId(user.uid)
        } else {
            window.location.href = '/'
        }
    })

    useEffect(() => {
        onSnapshot(markdownsCol, (snapshot) => {
            setMarkdowns(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }, [])


    function newMarkdown() {
        const docToAdd = doc(markdownsCol);
        setDoc(docToAdd, { docOwnerUid: userId })
        window.location.href = `/editor/${docToAdd.id}`
    }

    return (
        <main className='dashboard-page'>
            <h1>Dashboard</h1>
            <ul>
                {markdowns.length !== 0 && markdowns.map((markdown) => (
                    <li key={markdown.id}>
                        <NavLink to={`/editor/${markdown.id}`}>{markdown.id}</NavLink>
                    </li>
                ))}
            </ul>
            <button onClick={newMarkdown}>Start Writing</button>
        </main>
    )
}

