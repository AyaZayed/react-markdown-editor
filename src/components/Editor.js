import React, { useContext, useEffect, useState } from 'react'
import snarkdown from 'snarkdown'
import { FirebaseContext } from '../FirebaseContext'
import { useParams } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, setDoc, doc } from 'firebase/firestore';

export default function Editor() {

    const { firebaseApp } = useContext(FirebaseContext)
    // get route state
    const pageId = useParams().id

    const [currentMarkdown, setCurrentMarkdown] = useState({})

    const db = getFirestore(firebaseApp)

    const markdownsCol = collection(db, 'markdowns')

    const thisDoc = doc(markdownsCol, pageId);

    // get the document that matches the page id from the database
    useEffect(() => {
        onSnapshot(thisDoc, (snapshot) => {
            const data = snapshot.data() || {}
            setCurrentMarkdown(data)
        })
    }, [])

    const convert = (e) => {
        const markdown = e.target.value;
        const converted = snarkdown(markdown);
        setDoc(thisDoc, { converted, markdown }, { merge: true });
    }

    useEffect(() => {
        document.querySelector('.editor-output').innerHTML = currentMarkdown.converted || ''
    }, [currentMarkdown.converted])

    return (
        <main className='editor-page'>
            <h1>Editor</h1>
            <section className='editor-section'>
                <textarea className='editor-input'
                    value={currentMarkdown.markdown}
                    onChange={convert}
                ></textarea>
                <div className='editor-output'></div>
            </section>
        </main >
    )
}
