import './App.css'
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem.tsx";

type TaskStateType = {
  [key: string]: TaskType[]
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TaskStateType>({
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

  const removeTask = (todolistId: string ,taskId: string) => {
    const newTasks = tasks[todolistId].filter(t => t.id !== taskId);
    tasks[todolistId] = newTasks;
    setTasks({...tasks});
  }

  const filterTasks = (todolistId: string ,filter: FilterValuesType) => {
    const newTodolists = todolists.map(todo => todo.id === todolistId ? {...todo, filter} : todo );
    setTodolists(newTodolists);
  }

  const addTask = (todolistId: string ,title: string) => {

    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }

    tasks[todolistId] = [newTask, ...tasks[todolistId]];

    setTasks({...tasks});
  }

  const changeTaskStatus = (todolistId: string ,taskId: string, isDone: boolean) => {
    const newTasks = tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: isDone } : t);

    tasks[todolistId] = newTasks;

    setTasks({...tasks});
  }

  const removeTodolist = (todolistId: string) => {
    const newTodos = todolists.filter(todo => todo.id !== todolistId);

    delete tasks[todolistId];

    setTodolists([...newTodos]);

  }

  const addTodolist = (title: string) => {
    const newTodo: TodolistType = {
      id: v1(),
      title,
      filter: 'all'
    }

    setTodolists([newTodo, ...todolists]);
    setTasks({...tasks, [newTodo.id]: []});

  }

  const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => {
    const newTasks = tasks[todolistId].map(t => t.id === taskId ? { ...t, title: taskTitle } : t);
    tasks[todolistId] = newTasks;
    setTasks({...tasks});
  }

  return (
    <div className='App'> 
      {todolists.map(todolist => {

        let tasksForRender = tasks[todolist.id];

        if (todolist.filter === 'active') {
          tasksForRender = tasks[todolist.id].filter(t => !t.isDone);
        }

        if (todolist.filter === 'completed') {
          tasksForRender = tasks[todolist.id].filter(t => t.isDone);
        }
        return (
          <TodolistItem
            key={todolist.id}
            todolist={todolist}
            title={todolist.title}
            tasks={tasksForRender}
            removeTask={removeTask}
            filterTasks={filterTasks}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            addTodolist={addTodolist}
            changeTaskTitle={changeTaskTitle} />
        )
      })}
    </div>
  )


}

export default App
