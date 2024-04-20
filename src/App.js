import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Editor from './components/Editor'
import { firebaseApp, FirebaseContext } from './FirebaseContext'

export default function App() {
  return (
    <FirebaseContext.Provider value={firebaseApp} >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </FirebaseContext.Provider >
  )
}
