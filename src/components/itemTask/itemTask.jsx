import React from 'react'
import '../itemTask/style.css'

const ItemTask = (task) => {

    const {title, date, time} = task.task

    return (
        <li className='ItemTask'>
            <h3 className='ItemTask__title'>{title.toUpperCase()}</h3>
            <h3 className='ItemTask__date'>{date}</h3>
            <h3 className='ItemTask__time'>{time}</h3>
            <input type="checkbox" name="" id="" />
            <button>Eliminar tarea</button>
        </li>
    )
}

export default ItemTask