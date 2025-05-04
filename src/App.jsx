import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Link to="/">Главная</Link>
        <Link to="/about">О приложении</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}
