import React, { useContext, useEffect, useState } from 'react'
import '../tasks/style.css'
import ItemTask from '../itemTask/itemTask'
import { toast } from 'react-hot-toast'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { AuthContext } from '../../context/authContext'

const Tasks = () => {

    const {user} = useContext(AuthContext)

    const [inputTask, setInputTask] = useState('')
    const [inputDatetime, setInputDatetime] = useState('')
    const [list, setList] = useState(null)

    const taskCollection = collection(db, 'users')

    useEffect(() => {
        
        getDocs(taskCollection)
        .then(data => data.docs.map((data) => data.data()))
        .then(users => users.find(userdata => userdata.email == user.email))
        .then(userdata => userdata.tasks)
        .then(tasks => {
            setList(tasks);
            console.log('LISTA', list)
        })
        .catch(error => console.log(error))
        console.log(list)
    }, [])
    

    const handlerCreateTask = () =>{
        if(inputTask && inputDatetime){
            
        }else{
            toast.error('Falta completar algún campo')
        }
    }

    return (
        <div className='task'>
            <div className='task__div'>
                <ul className='task__inputs'>
                    <input type="text" name="" id="task" placeholder='Llevar a pasear al perro...' onChange={(e)=> setInputTask(e.target.value)} required />
                    <input type="datetime-local" name="" id="taskHour" onChange={(e)=> setInputDatetime(e.target.value)} required />
                    <button onClick={handlerCreateTask}>Crear tarea</button>
                </ul>
                <div className='task__list'>
                    {
                        list ?
                        list.map((task, i) => {
                            return(
                                <ItemTask key={i} task={task}/>
                            )
                        })
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Tasks