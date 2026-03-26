import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType, TodolistType } from "./App.tsx";
import { EditableSpan } from './EditableSpan.tsx';
import { AddItemForm } from './AddItemForm.tsx';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {containerSx} from './TodolistItem.styles';
import {getListItemSx} from './TodolistItem.styles';

type TodolistItemType = {
    todolist: TodolistType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    filterTasks: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    addTodolist: (title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, taskTitle: string) => void
    changeTodolistTitle: (todolistId: string, todolistTitle: string) => void
}

export const TodolistItem = ({ title, tasks, removeTask, filterTasks, addTask, changeTaskStatus, todolist, removeTodolist, addTodolist, changeTaskTitle, changeTodolistTitle }: TodolistItemType) => {

    const addTaskHandler = (title: string) => {
        addTask(todolist.id, title);
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolist.id, title);
    }

    return (
        <div>
            
            <h1>
                <EditableSpan title={todolist.title} onChange={changeTodolistTitleHandler} />
                <IconButton onClick={() => {
                    removeTodolist(todolist.id);
                }}>
                    <Delete />
                </IconButton>

            </h1>
            <AddItemForm addItem={addTaskHandler} />
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <List>
                    {tasks.map(t => {
                        const removeTaskHandler = () => removeTask(todolist.id, t.id);
                        const onChangeTitleHandler = (newValue: string) => {
                            changeTaskTitle(todolist.id, t.id, newValue);
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolist.id, t.id, e.currentTarget.checked);
                        return <ListItem key={t.id}
                                         sx={getListItemSx(t.isDone)}>
                            <div>
                            <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                            </div>
                            <IconButton onClick={removeTaskHandler}>
                                <Delete />
                            </IconButton>
                        </ListItem>
                    })}
                </List>
            )}
            <Box sx={containerSx}>
            <Button variant={todolist.filter === 'all' ? 'contained' : 'text'} onClick={() => { filterTasks(todolist.id, 'all') }}>All</Button>
            <Button color='primary' variant={todolist.filter === 'active' ? 'contained' : 'text'} onClick={() => { filterTasks(todolist.id, 'active') }}>Active</Button>
            <Button color='secondary' variant={todolist.filter === 'completed' ? 'contained' : 'text'} onClick={() => { filterTasks(todolist.id, 'completed') }}>Completed</Button>
            </Box>
        </div>
    );
};

