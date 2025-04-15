import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";

type TodolistItemType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filterTasks: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const TodolistItem = ({filter, title, tasks, removeTask,filterTasks, addTask, changeTaskStatus}: TodolistItemType) => {
    const [value, setValue] = useState<string>('');

    const addTaskHanler = () => {
        const trimmedTask = value.trim();
        if (trimmedTask) {
            addTask(trimmedTask);
        }
        setValue('');
    }
    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTaskHanler();
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }
    return (
        <div>
            <h1>{title}</h1>
            <input type="text" value={value}
                   onChange={onChangeInputHandler} onKeyDown={addTaskKeyDownHandler}/>

            <Button title={'+'} onClick={addTaskHanler}/>
            <ul>
                {tasks.map(t => {
                    const removeTaskHandler = () => removeTask(t.id);
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked);
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={t.isDone ? 'task-is-active' : ''}>{t.title}</span>
                        <Button title={'x'} onClick={removeTaskHandler}/>
                    </li>
                })}
            </ul>
            <Button classes={filter === 'all' ? 'btn-filter-active' : ''} title={'All'} onClick={() => {filterTasks('all')}}/>
            <Button classes={filter === 'active' ? 'btn-filter-active' : ''} title={'Active'} onClick={() => {filterTasks('active')}}/>
            <Button classes={filter === 'completed' ? 'btn-filter-active' : ''} title={'Completed'} onClick={() => {filterTasks('completed')}}/>
        </div>
    );
};

