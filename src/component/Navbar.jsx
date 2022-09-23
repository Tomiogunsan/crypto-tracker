import React from 'react'
import { GiCoins} from 'react-icons/gi'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <Link to='/'>
           <div className='navbar'>
            <GiCoins className='icon' />
            <h1>Coin <span className='yellow'> Tracker </span></h1>
            </div> 
        </Link>
    )
}

export default Navbar