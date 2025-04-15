import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App.tsx";

type TodolistItemType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filterTasks: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodolistItem = ({tasks, removeTask,filterTasks, addTask}: TodolistItemType) => {
    const [value, setValue] = useState<string>('');
    return (
        <div>
            <h1>What to learn</h1>
            <input type="text" value={value} onChange={(e) => {
                setValue(e.currentTarget.value);
            }}/>
            <button onClick={() => {
                addTask(value);
            }}>+</button>
            <ul>
                {tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
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

