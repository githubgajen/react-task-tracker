import './App.css';
<<<<<<< HEAD
import { useState } from 'react'
=======
import { useState, useEffect } from 'react'
>>>>>>> 8d0f538 (downloaded json-server implementation build from vercel, created new repo and push to same github repo)
import ReactLogo from './components/ReactLogo';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


const App = () => {
<<<<<<< HEAD
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([
      {
          id: 1,
          text: 'Go To Gym',
          day:' 4 days a week at 6:00am',
          reminder: true
      },
      {
          id: 2,
          text: 'Good/Cook Food',
          day:'3 days a week at 12:00pm',
          reminder: true
      },
      {
          id: 3,
          text:'Good Sleep',
          day:' Every day at 11:59pm',
          reminder: false
      }
  ])

  // Add Task
  const addTask = (task) => {
    //console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1
    console.log(id)
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
  setTasks(tasks.filter((task)=> task.id !== id))
  }
  const toggleReminder = (id)=>{
    setTasks(
      tasks.map((task)=>
        task.id === id ? { ...task, reminder: !task.reminder } : task 
=======
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])  //empty array

  useEffect(() => {
    const getTasks = async() =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)//add in state
    }
    getTasks()
  },[])


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

// Fetch Tasks
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

    // Add Task
    const addTask = async (task) => {
    //const newTask = {id:3,...task}

    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify(task)
    })                          
    const data = await res.json()

    setTasks([...tasks,data]) 
    //json-server creates id automatically

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE',
  })
  setTasks(tasks.filter((task)=> task.id !== id))
  }

  const toggleReminder = async (id) =>{
    //getting task, creating a task and putting it in a variable
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task)=>
        task.id === id ? { ...task, reminder: data.reminder } : task 
>>>>>>> 8d0f538 (downloaded json-server implementation build from vercel, created new repo and push to same github repo)
    )
    )
  }

  return (
    <>
    <div><ReactLogo/></div>
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}
        />
        
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? 
        <Tasks 
          tasks     = {tasks} 
          onDelete  = {deleteTask}
          onToggle  = {toggleReminder}
          />
        :'No Task Available ...Nakuman'}
    </div>
  </> 
  );
}
export default App;
