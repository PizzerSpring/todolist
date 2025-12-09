import { ChangeEvent, useState } from "react"

type EditableSpanType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = ({ title, onChange }: EditableSpanType) => {
    const [value, setValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    const onBlurHandler = () => {
        setEditMode(false);
        onChange(value);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const onDoubleClickHandler = () => {
        setEditMode(true);
        setValue(title);
    }

    return editMode
        ? <input type="text" value={value} onBlur={onBlurHandler} onChange={onChangeHandler} /> :
        <span onDoubleClick={onDoubleClickHandler}>{title}</span>

}