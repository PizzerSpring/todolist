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
    const [error, setError] = useState<string | null>(null);

    const isCheckedCharacters = value.length > 20;

    const addTaskHanler = () => {
        const trimmedTask = value.trim();
        if (trimmedTask) {
            addTask(trimmedTask);
        } else {
            setError('Title is required');
        }
        setValue('');
    }
    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && !isCheckedCharacters) {
            addTaskHanler();
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        setError(null);
    }
    return (
        <div>
            <h1>{title}</h1>
            <input className={error ? 'error-input' : ''} type="text" value={value}
                   onChange={onChangeInputHandler} onKeyDown={addTaskKeyDownHandler}/>

            <Button disabled={isCheckedCharacters} title={'+'} onClick={addTaskHanler}/>
            {error && <div className={'error-message'}>{error}</div>}
            {isCheckedCharacters && <div className={'error-message'}>Maximum number of characters 20</div>}
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
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
            )}
            <Button classes={filter === 'all' ? 'btn-filter-active' : ''} title={'All'} onClick={() => {filterTasks('all')}}/>
            <Button classes={filter === 'active' ? 'btn-filter-active' : ''} title={'Active'} onClick={() => {filterTasks('active')}}/>
            <Button classes={filter === 'completed' ? 'btn-filter-active' : ''} title={'Completed'} onClick={() => {filterTasks('completed')}}/>
        </div>
    );
};

