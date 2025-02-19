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
                <Link to="/lernende">Lernende</Link>
                <Link to="/lehrbetrieb_lernende">Lehrbetrieb & Lernende</Link>
                <Link to="/dozenten">Dozenten</Link>
                <Link to="/kurse">Kurse</Link>
                <Link to="/laender">Länder</Link>
            </nav>
        </header>
    )
}

export default Header