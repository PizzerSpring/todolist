import React from 'react';
import {FilterValuesType, TaskType} from "./App.tsx";

type TodolistItemType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filterTasks: (filter: FilterValuesType) => void
}

export const TodolistItem = ({tasks, removeTask,filterTasks}: TodolistItemType) => {
    return (
        <div>
            <h1>What to learn</h1>
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

