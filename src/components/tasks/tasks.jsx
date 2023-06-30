import React, { useContext, useEffect, useState } from 'react'
import '../tasks/style.css'
import ItemTask from '../itemTask/itemTask'
import { toast } from 'react-hot-toast'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { AuthContext } from '../../context/authContext'

const Tasks = () => {

    const { user, listingTasks, tasksList } = useContext(AuthContext)


    const [inputTask, setInputTask] = useState('')
    const [inputDate, setInputDate] = useState('')
    const [inputTime, setInputTime] = useState('')

    useEffect(() => {
        console.log(tasksList)
    }, [tasksList])

    const handlerCreateTask = () => {

        if (inputTask && inputDate && inputTime) {

            const docRef = doc(db, 'users', user.id)

            const generateId = async () => {
                const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                let id = ''

                for (let i = 0; i <= numberArray.length; i++) {
                    id += (Math.floor(Math.random() * numberArray.length)).toString()
                }

                if(tasksList.id == id){
                    generateId()
                }else{
                    return id
                }
            }

            const update = async () => {
                const idNumber = await generateId()
                try {
                    updateDoc(docRef, {
                        tasks: [
                            ...tasksList,
                            {
                                title: inputTask,
                                date: inputDate,
                                time: inputTime,
                                id: idNumber
                            }]
                    })
                        .then(() => {
                            console.log('UPDATED')
                            listingTasks()
                        })
                        .catch((error) => console.log(error))
                } catch (error) {
                    console.log(error)
                }
            }

            update()
        } else {
            toast.error('Falta completar algún campo')
        }
    }

    return (
        <div className='task'>
            <div className='task__div'>
                <ul className='task__inputs'>
                    <input type="text" name="" id="task" placeholder='Llevar a pasear al perro...' onChange={(e) => setInputTask(e.target.value)} required />
                    <input type="date" name="" id="taskDate" onChange={(e) => setInputDate(e.target.value)} required />
                    <input type="time" name="" id="taskTime" onChange={(e) => setInputTime(e.target.value)} required />
                    <button onClick={handlerCreateTask}>Crear tarea</button>
                </ul>
                <div className='task__list'>
                    {
                        tasksList ?
                            tasksList.map((task, i) => {
                                return (
                                    <ItemTask key={i} task={task} />
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