import React from 'react';

type ButtonType = {
    title: string
    onClick: () => void
    classes?: string
}

export const Button = ({title, onClick, classes}: ButtonType) => {
    return (
        <button className={classes} onClick={onClick}>{title}</button>
    );
};

