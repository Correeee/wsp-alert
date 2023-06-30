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
    const [tasks, setTasks] = useState('')
    const [tasksList, setTasksList] = useState([])

    const usersCollection = collection(db, 'users')

    useEffect(() => {
        onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
                getDocs(usersCollection)
                    .then(data => {
                        const userFounded = data.docs.map((users) => {
                            return {
                                id: users.id,
                                ...users.data()
                            }
                        }).find((user) => user.email == currentuser.email)
                        setUser(userFounded)
                        setTasksList(userFounded.tasks)
                        console.log(userFounded)
                        setTasks(userFounded.tasks.length.toString())
                        
                    })
                    .catch(error => console.log(error))
            }
        })
    }, [])


    const listingTasks = () =>{
        
        toast.promise(getDocs(usersCollection), {
            loading: 'Listando tareas...',
            success: 'Tareas listadas',
            error: 'No se pueden listar las tareas',

        })
        .then(data => {
            const userFounded = data.docs.map((users) => {
                return {
                    id: users.id,
                    ...users.data()
                }
            }).find((data) => data.email == user.email)
            console.log('LISTING', userFounded)
            setTasksList(userFounded.tasks)
            setTasks(userFounded.tasks.length.toString())
        })
        .catch(error => console.log(error))

    }

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
                            const userFounded = data.docs.map((users) => {
                                return {
                                    id: users.id,
                                    ...users.data()
                                }
                            }).find((user) => user.email == email)
                            setUser(userFounded)
                            setTasksList(userFounded.tasks)
                            setTasks(userFounded.tasks.length.toString())                         
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
            .then(() => setUser(null))
            .then(() =>{
                setTasks('')
                setTasksList([])
            })
            .catch(error => console.log(error))
    }

    return (
        <AuthContext.Provider value={{ setEmail, setPassword, handlerLogin, user, handlerLogout, tasks, listingTasks, tasksList}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider