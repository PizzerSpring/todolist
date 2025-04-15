import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App.tsx";

type TodolistItemType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filterTasks: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({tasks, removeTask,filterTasks, addTask, changeTaskStatus}: TodolistItemType) => {
    const [value, setValue] = useState<string>('');
    return (
        <div>
            <h1>What to learn</h1>
            <input type="text" value={value}
                   onChange={(e) => {
                setValue(e.currentTarget.value);
            }} onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    addTask(value);
                    setValue('');
                }

            }}/>
            <button onClick={() => {
                addTask(value);
                setValue('');
            }}>+</button>
            <ul>
                {tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(e) => {
                            changeTaskStatus(t.id, e.currentTarget.checked);
                        }}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            removeTask(t.id);
                        }}>x</button>
                    </li>
                })}
            </ul>
            <button onClick={() => {filterTasks('all')} }>All</button>
            <button onClick={() => {filterTasks('active')} }>Active</button>
            <button onClick={() => {filterTasks('completed')} }>Completed</button>
        </div>
    );
};

