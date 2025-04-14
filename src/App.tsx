import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {TodolistItem} from "./TodolistItem.tsx";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    setTasks(filteredTasks);
  }


  return (
    <>
      <TodolistItem tasks={tasks} removeTask={removeTask}/>
    </>
  )
}

export default App
