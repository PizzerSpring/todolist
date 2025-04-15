import React from 'react';

type ButtonType = {
    title: string
    onClick: () => void
    classes?: string
    disabled?: boolean
}

export const Button = ({title, onClick, classes, disabled}: ButtonType) => {
    return (
        <button disabled={disabled} className={classes} onClick={onClick}>{title}</button>
    );
};

