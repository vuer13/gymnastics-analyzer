import './Navbar.css'
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav'>
        <h1>
            Gymnastics Analyzer
        </h1>
        <div>
            <Link to='/'>Home</Link>
            <Link to='/view'>View</Link>
            <Link to='/upload'>Analyze</Link>
        </div>
    </nav>
  )
}

export default Navbar