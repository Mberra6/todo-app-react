import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm(props) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addTodo(value);
        setValue("");
    };

  return (
    <form className='todoForm' onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a new task" className='todo-input' value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button type="submit" className='todo-btn'>Add Task</button>
    </form>
  )
}

export default TodoForm