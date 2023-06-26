import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from '../components/utils/firebase'
import { toast } from 'react-hot-toast'
import { collection, doc, getDocs } from 'firebase/firestore'


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const usersCollection = collection(db, 'users')

    useEffect(() => {
        onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
                getDocs(usersCollection)
                    .then(data => {
                        const userFounded = data.docs.map((users) => users.data()).find((user) => user.email == currentuser.email)
                        setUser(userFounded)
                    })
                    .catch(error => console.log(error))
            }
        })

    }, [])




    const handlerLogin = (e) => {
        e.preventDefault()

        if (email, password) {
            toast.promise(signInWithEmailAndPassword(auth, email, password), {
                loading: 'Intentando iniciar sesión...',
                success: 'Sesión iniciada',
                error: 'Correo y/o contraseña incorrecta',
            })
                .then(() => {
                    getDocs(usersCollection)
                        .then(data => {
                            const userFounded = data.docs.map((users) => users.data()).find((user) => user.email == email)
                            setUser(userFounded)
                        })
                })
                .catch(error => console.log(error))
        }
    }

    const handlerLogout = () => {
        toast.promise(auth.signOut(), {
            loading: 'Cerrando sesión...',
            success: 'Sesión cerrada',
            error: 'Imposible cerrar sesión'
        })
            .then(data => setUser(data))
            .catch(error => console.log(error))
    }

    return (
        <AuthContext.Provider value={{ setEmail, setPassword, handlerLogin, user, handlerLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider