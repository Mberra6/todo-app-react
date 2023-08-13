import React, { useState } from 'react';
import './TodoEditForm.css';

function TodoEditForm(props) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        props.editTask(props.todo.id, value);
    };

  return (
    <form className='editForm' onSubmit={handleSubmit}>
        <input type="text" placeholder="Update Task" className='edit-input' value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button type="submit" className='edit-btn'>Update</button>
    </form>
  )
}

export default TodoEditForm;