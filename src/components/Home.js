import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <main className='home-page'>
            <h1>Home</h1>
            <NavLink to='/dashboard'>Dashboard</NavLink>
        </main>
    )
}
