import './App.css'
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem.tsx";
import { AddItemForm } from './AddItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { containerSx } from './TodolistItem.styles';
import { NavButton } from './NavButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';

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

type ThemeMode = 'dark' | 'light';

function App() {

  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#ef6c00'
      }
    }
  });

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }

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

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) });
  }

  const filterTasks = (todolistId: string, filter: FilterValuesType) => {
    const newTodolists = todolists.map(todo => todo.id === todolistId ? { ...todo, filter } : todo);
    setTodolists(newTodolists);
  }

  const addTask = (todolistId: string, title: string) => {

    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }

    tasks[todolistId] = [newTask, ...tasks[todolistId]];

    setTasks({ ...tasks });
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const newTasks = tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: isDone } : t);

    tasks[todolistId] = newTasks;

    setTasks({ ...tasks });
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
    setTasks({ ...tasks, [newTodo.id]: [] });

  }

  const changeTaskTitle = (todolistId: string, taskId: string, taskTitle: string) => {
    const newTasks = tasks[todolistId].map(t => t.id === taskId ? { ...t, title: taskTitle } : t);
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  }

  const changeTodolistTitle = (todolistId: string, todolistTitle: string) => {
    const newTodos = todolists.map(t => t.id === todolistId ? { ...t, title: todolistTitle } : t);
    setTodolists([...newTodos]);
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color={'default'} onChange={changeMode}/>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{ padding: '20px' }} sx={{ mb: '30px' }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container spacing={3}>
            {todolists.map(todolist => {

              let tasksForRender = tasks[todolist.id];

              if (todolist.filter === 'active') {
                tasksForRender = tasks[todolist.id].filter(t => !t.isDone);
              }

              if (todolist.filter === 'completed') {
                tasksForRender = tasks[todolist.id].filter(t => t.isDone);
              }
              return (
                <Grid>
                  <Paper style={{ padding: '10px' }} sx={{ p: '0 20px 20px 20px' }}>
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
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle} />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )


}

export default App
