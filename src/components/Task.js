import React from 'react'
import { FaTimes } from 'react-icons/fa';

const Task = ({task,onDelete,onToggle}) => {
  return (
    // task and reminder are class names given to the div
    // if task.reminder is true, then the class reminder will be invoked
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} /></h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task
