import React, { useContext, useEffect, useState } from 'react'
import '../login/style.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/DALL·E 2023-06-24 01.18.57 - whatsapp + alarm.png'
import { AuthContext } from '../../context/authContext'
import Tasks from '../tasks/tasks'



const Login = () => {

    const { setEmail, setPassword, handlerLogin, user } = useContext(AuthContext)
    
    return (
        <>
            {!user ?
                <div className='login'>
                    <form id='login__form'>
                        <img src={logo} alt="logo" />
                        <input type='email' placeholder='email@email.com' onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' placeholder='contraseña' onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" form='login__form' onClick={handlerLogin}>Ingresar</button>
                        <Link to={'/register'}>Registrarse</Link>
                    </form>
                </div> :
                <Tasks />
            }
        </>
    )
}

export default Login