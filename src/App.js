import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Editor from './components/Editor'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor/:id" element={<Editor />} />
    </Routes>
  )
}
