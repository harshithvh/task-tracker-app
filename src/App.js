// Quick start:
// 1st terminal: npm run server (to start the server for crud operations in db.json)
// 2nd terminal: npm start (to start the app)

import React from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// useState is a React hook
// useEffect: In order to fetch the data from the server when the page loads
import { useState, useEffect } from 'react'

function App() {
  // to display the add form - initially false
  // showAddTask is a variable and setShowAddTask is a function that changes the value of showAddTask
  const [showAddTask, setShowAddTask] = useState(false)
  
  // setTasks is to update a task
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  
  // fetchTasks: fetch the data from the server
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    return data
  }
  // fetchTask
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await response.json()
    setTasks([...tasks, data])
  
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }  

  // Toggle Reminder
  const toggleReminder = async (id) => {
  
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })
    const data = await res.json()
    // ...task means copy all the property and values of that task but change the reminder to false
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
          <Routes>
            <Route path='/' element={
              <>
                {showAddTask ? <AddTask onAdd={addTask}/> : ""}
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
              </> 
               } />
            <Route path='/about' element={<About />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}
// in the above div tag the onAdd, showAdd and tasks are passed as props to the Header component
// similarly onDelete, onToggle are passed as props to the Tasks component
// setShowAddTask is a function that controls the visibility of the add form on the click of the add button by changing the value of showAddTask to either true or false
// depending on the value of showAddTask the AddTask component is rendered or not

export default App;


