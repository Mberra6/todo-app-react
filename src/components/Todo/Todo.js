import React from 'react';
import './Todo.css';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa6';

const Todo = (props) => {

  return (
    <div className='todo'>
        <div className='todo-text' onClick={() => props.toggleComplete(props.todo.id)}>
          <p className={`${props.todo.completed ? "completed" : ""}`}>{props.todo.task}</p>
        </div>
        <div className='icons'>
            <FaPenToSquare className='editIcon' onClick={() => props.editForm(props.todo.id)}/>
            <FaTrash onClick={() => props.deleteTodo(props.todo.id)}/>
        </div>
    </div>
  )
}

export default Todo;
