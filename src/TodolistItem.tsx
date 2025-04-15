import React, {useState} from 'react';
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
    return (
        <div>
            <h1>{title}</h1>
            <input type="text" value={value}
                   onChange={(e) => {
                setValue(e.currentTarget.value);
            }} onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    addTask(value);
                    setValue('');
                }
            }}/>

            <Button title={'+'} onClick={() => {
                const trimmedTask = value.trim();
                if (trimmedTask) {
                    addTask(trimmedTask);
                }
                setValue('');
            }}/>
            <ul>
                {tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(e) => {
                            changeTaskStatus(t.id, e.currentTarget.checked);
                        }}/>
                        <span className={t.isDone ? 'task-is-active' : ''}>{t.title}</span>
                        <Button title={'x'} onClick={() => {
                            removeTask(t.id);
                        }}/>
                    </li>
                })}
            </ul>
            <Button classes={filter === 'all' ? 'btn-filter-active' : ''} title={'All'} onClick={() => {filterTasks('all')}}/>
            <Button classes={filter === 'active' ? 'btn-filter-active' : ''} title={'Active'} onClick={() => {filterTasks('active')}}/>
            <Button classes={filter === 'completed' ? 'btn-filter-active' : ''} title={'Completed'} onClick={() => {filterTasks('completed')}}/>
        </div>
    );
};

