import { useState } from "react"

type EditableSpanType = {
    title: string
}

export const EditableSpan = ({title}: EditableSpanType) => {
    const [value, setValue] = useState(title);
    const [editMode, setEditMode] = useState(false);

    return editMode
      ? <input type="text" value={value} onBlur={(e) => {
        setEditMode(false);
      }} onChange={(e) => {
        setValue(e.currentTarget.value);
      }}/> :
      <span onDoubleClick={(e) => {
        setEditMode(true);
      }}>{value}</span>

}