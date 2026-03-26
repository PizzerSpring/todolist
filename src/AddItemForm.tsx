import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from '@mui/material';
import { TodolistType } from './App.tsx';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ControlPoint} from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';


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
            <TextField variant='outlined' label='Type value' error={!!error} type="text" value={value} helperText={error}
                onChange={onChangeInputHandler} onKeyDown={addTaskKeyDownHandler} />

            <IconButton disabled={isCheckedCharacters} onClick={addTaskHanler} color='primary'>
                 <AddBoxIcon />
            </IconButton>
          
            {isCheckedCharacters && <div className={'error-message'}>Maximum number of characters 20</div>}
        </>
    )

}