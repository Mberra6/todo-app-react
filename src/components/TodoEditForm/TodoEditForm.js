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
        <h2 className='edit-title'>Update Todo</h2>
        <input type="text" placeholder="Update Task" className='edit-input' value={value} onChange={(e) => setValue(e.target.value)}></input>
        <div className="edit-buttons">
          <button type="button" className='cancel-btn' onClick={props.onCancel}>Cancel</button>
          <button type="submit" className='edit-btn'>Update</button>
        </div>
    </form>
  )
}

export default TodoEditForm;