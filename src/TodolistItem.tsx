import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType, TodolistType} from "./App.tsx";
import {Button} from "./components/Button.tsx";

type TodolistItemType = {
    todolist: TodolistType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string ,taskId: string) => void
    filterTasks: (todolistId: string ,filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({ title, tasks, removeTask,filterTasks, addTask, changeTaskStatus, todolist}: TodolistItemType) => {
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
        error && setError(null);
        setValue(e.currentTarget.value);
    }
    return (
        <div>
            <h1>{title}</h1>
            <input className={error ? 'error-input' : ''} type="text" value={value}
                   onChange={onChangeInputHandler} onKeyDown={addTaskKeyDownHandler}/>

            <Button disabled={isCheckedCharacters} title={'+'} onClick={addTaskHanler}/>
            {error && <div className={'error-message'}>{error}</div>}
            {isCheckedCharacters && <div className={'error-message'}>Maximum number of characters 20</div>}
            {tasks?.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks?.map(t => {
                        const removeTaskHandler = () => removeTask(todolist.id ,t.id);
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked);
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                            <span className={t.isDone ? 'task-is-active' : ''}>{t.title}</span>
                            <Button title={'x'} onClick={removeTaskHandler}/>
                        </li>
                    })}
                </ul>
            )}
            <Button classes={todolist.filter === 'all' ? 'btn-filter-active' : ''} title={'All'} onClick={() => {filterTasks(todolist.id ,'all')}}/>
            <Button classes={todolist.filter === 'active' ? 'btn-filter-active' : ''} title={'Active'} onClick={() => {filterTasks(todolist.id ,'active')}}/>
            <Button classes={todolist.filter === 'completed' ? 'btn-filter-active' : ''} title={'Completed'} onClick={() => {filterTasks(todolist.id ,'completed')}}/>
        </div>
    );
};

