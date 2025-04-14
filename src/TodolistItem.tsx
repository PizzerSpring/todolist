import React from 'react';
import {TaskType} from "./App.tsx";

type TodolistItemType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}

export const TodolistItem = ({tasks, removeTask}: TodolistItemType) => {
    return (
        <div>
            <h1>What to learn</h1>
            <ul>
                {tasks.map(t => {
                    return <li key={t.id}>
                        <span>{t.title}</span>
                        <span>{t.isDone}</span>
                        <button onClick={() => {
                            removeTask(t.id);
                        }}>x</button>
                    </li>
                })}
            </ul>
        </div>
    );
};

