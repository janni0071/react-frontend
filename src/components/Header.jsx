import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css';
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <header>
            <Link to="/"><img src={logo} alt="App logo: a red blurry circle" /></Link>
            
            <nav>
                <Link to="/">Home</Link>
                <Link to="/lehrbetriebe">Lehrbetriebe</Link>
            </nav>
        </header>
    )
}

export default Header