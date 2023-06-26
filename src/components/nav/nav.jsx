import React, { useContext, useEffect, useState } from 'react'
import '../nav/style.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import UserDefaultImg from '../../assets/user.png'

const Nav = () => {

    const { user, handlerLogout } = useContext(AuthContext)

    return (
        <header>
            <nav className='nav'>
                <div className='nav__user'>
                    {!user ? '' : <h3>{user.name + ' ' + user.surName}</h3>}
                    <img src={!user ? UserDefaultImg : user.image} alt={!user ? 'fotografía': user.name + ' ' + user.surName} />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                    <button onClick={handlerLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Nav;