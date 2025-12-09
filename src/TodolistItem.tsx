import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType, TodolistType } from "./App.tsx";
import { Button } from "./components/Button.tsx";
import { EditableSpan } from './EditableSpan.tsx';
import { AddItemForm } from './AddItemForm.tsx';

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
}

export const TodolistItem = ({ title, tasks, removeTask, filterTasks, addTask, changeTaskStatus, todolist, removeTodolist, addTodolist, changeTaskTitle }: TodolistItemType) => {
   // const [value, setValue] = useState<string>('');

    return (
        <div>
            <div>
                <input type="text" />
                <button onClick={() => {
                   // addTodolist(value);
                }}>Add Todolist</button>
            </div>
            <h1>
                {title}
                <button onClick={() => {
                    removeTodolist(todolist.id);
                }}>X</button>
            </h1>
            <AddItemForm id={todolist.id} addTask={addTask}/>
            {tasks?.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks?.map(t => {
                        const removeTaskHandler = () => removeTask(todolist.id, t.id);
                        const onChangeTitleHandler = (newValue: string) => {
                            changeTaskTitle(todolist.id, t.id, newValue);
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolist.id, t.id, e.currentTarget.checked);
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <Button title={'x'} onClick={removeTaskHandler} />
                        </li>
                    })}
                </ul>
            )}
            <Button classes={todolist.filter === 'all' ? 'btn-filter-active' : ''} title={'All'} onClick={() => { filterTasks(todolist.id, 'all') }} />
            <Button classes={todolist.filter === 'active' ? 'btn-filter-active' : ''} title={'Active'} onClick={() => { filterTasks(todolist.id, 'active') }} />
            <Button classes={todolist.filter === 'completed' ? 'btn-filter-active' : ''} title={'Completed'} onClick={() => { filterTasks(todolist.id, 'completed') }} />
        </div>
    );
};

