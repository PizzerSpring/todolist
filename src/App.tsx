import './App.css'
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem.tsx";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })
  const [filter, setFilter] = useState<FilterValuesType>('all');

  let tasksForRender = tasks;

  if (filter === 'active') {
    tasksForRender = tasks.filter(t => !t.isDone);
  }

  if (filter === 'completed') {
    tasksForRender = tasks.filter(t => t.isDone);
  }

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    setTasks(filteredTasks);
  }

  const filterTasks = (filter: FilterValuesType) => {
    setFilter(filter);
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks([newTask, ...tasks]);
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newTasks = tasks.map(t => t.id === taskId ? { ...t, isDone: isDone } : t);
    setTasks(newTasks);
  }


  return (
    <>
      <TodolistItem
        filter={filter}
        title={'What to learn?'}
        tasks={tasksForRender}
        removeTask={removeTask}
        filterTasks={filterTasks}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus} />
    </>
  )
}

export default App
