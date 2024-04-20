import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';
import { FirebaseContext } from '../FirebaseContext'

export default function Dashboard() {
    const [docs, setDocs] = useState([])

    // random id for the editor page
    const id = Math.floor(Math.random() * 1000000000)
    const editorPath = `/editor/${id}`

    // get all documents
    const firebaseApp = useContext(FirebaseContext)
    const db = getFirestore(firebaseApp);
    const markdownsCol = collection(db, 'markdowns');

    useEffect(() => {
        const unsubscribe = onSnapshot(markdownsCol, (querySnapshot) => {
            const dataDocs = []
            querySnapshot.forEach((doc) => {
                dataDocs.push({ ...doc.data(), id: doc.id })
            })
            setDocs(dataDocs)
        })
        return () => unsubscribe()
    }, [])

    return (
        <main className='dashboard-page'>
            <h1>Dashboard</h1>
            <ul>
                {docs.length !== 0 && docs.map((doc) => (
                    <li key={doc.id}>
                        <NavLink to={`/editor/${doc.id}`}>{doc.id}</NavLink>
                    </li>
                ))}
            </ul>
            <NavLink to={editorPath}>Start Writing</NavLink>
        </main>
    )
}
