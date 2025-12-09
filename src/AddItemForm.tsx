import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from "./components/Button.tsx";
import { TodolistType } from './App.tsx';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormType) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const isCheckedCharacters = value.length > 20;

    const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isCheckedCharacters) {
            addTaskHanler();
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setValue(e.currentTarget.value);
    }

    const addTaskHanler = () => {
        const trimmedTask = value.trim();
        if (trimmedTask) {
            addItem(trimmedTask);
        } else {
            setError('Title is required');
        }
        setValue('');
    }

    return (
        <>
            <input className={error ? 'error-input' : ''} type="text" value={value}
                onChange={onChangeInputHandler} onKeyDown={addTaskKeyDownHandler} />

            <Button disabled={isCheckedCharacters} title={'+'} onClick={addTaskHanler} />
            {error && <div className={'error-message'}>{error}</div>}
            {isCheckedCharacters && <div className={'error-message'}>Maximum number of characters 20</div>}
        </>
    )

}