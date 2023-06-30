import React, { useEffect, useState } from 'react'
import '../register/style.css'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { db, storage } from '../utils/firebase'
import { auth } from '../utils/firebase'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { Toaster, toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Register = () => {

    const users = collection(db, 'users')

    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [imageBlob, setImageBlob] = useState('')
    const [firstPassword, setFirstPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const [password, setPassword] = useState('')
    const [wsp, setWsp] = useState('')

    useEffect(() => {
        if(firstPassword == secondPassword) setPassword(firstPassword)
    }, [firstPassword, secondPassword])

    const handlerImage = (e) => {
        setImageBlob(e.target.files[0])
        let img = URL.createObjectURL(e.target.files[0])
        if (img) setImage(img)
    }

    const handlerRegister = (e) => {
        e.preventDefault()

        if (name, surName, email, image, password, wsp) {

            const storageRef = ref(storage, wsp.split('+').join(''))

            toast.promise(createUserWithEmailAndPassword(auth, email, password), {
                loading: 'Registrando usuario...',
                success: 'Usuario registrado con éxito',
                error: 'No se realizó el registro. \n Puede que el Correo ya exista.'
            })
                .then(userCredential => console.log(userCredential))
                .then(() =>{
                    uploadBytes(storageRef, imageBlob)
                    .then((data) => {
                        getDownloadURL(storageRef)
                            .then(url => {
                                addDoc(users, {
                                    name,
                                    surName,
                                    email,
                                    image: url,
                                    wsp,
                                    date: Timestamp.fromDate(new Date()),
                                    tasks: []
                                })
                            })
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
                

        }

    }
    return (
        <div className='register'>
            <form action="" id='register__form'>
                <div className='register__files'>
                    <img src={image} alt="fotografia" />
                    <input type="file" accept='/image' onChange={(e) => handlerImage(e)} required />
                </div>
                <input type="text" placeholder='Nombre' onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder='Apellido' onChange={(e) => setSurName(e.target.value)} required />
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder='Contraseña' onChange={(e) => setFirstPassword(e.target.value)} required />
                <input type="password" placeholder='Repita su contraseña' onChange={(e) => setSecondPassword(e.target.value)} required />
                <input type="text" placeholder='Whatsapp' onChange={(e) => setWsp(e.target.value)} required />
                <button type="submit" form='register__form' onClick={handlerRegister}>Registrarse</button>
                <Link to={'/'}>Ingresar</Link>
            </form>

        </div>
    )
}

export default Register