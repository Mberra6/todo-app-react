import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import './TodoWrapper.css';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
import TodoEditForm from '../TodoEditForm/TodoEditForm';


const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      if (localStorage.getItem('mode') === "Dark Mode") {
        const body = document.querySelector("body");
        const mode = document.querySelector(".mode-switch");
        body.classList.add('dark');
        mode.textContent = 'Light Mode';
      }
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    }, []);

    const addTodo = (value) => {
      const newTodo = {
        id: uuidv4(),
        task: value.trim(),
        completed: false,
        isEditing: false
      };

      if (newTodo.task.length > 0) {
        newTodo.task = newTodo.task.charAt(0).toUpperCase() + newTodo.task.slice(1);
        setTodos([...todos, newTodo]);
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));

      } else {
        alert("Enter a Valid Task");
      }
    };

    const deleteTodo = (id) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    const toggleComplete = (id) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const editForm = (id) => {
      const updatedTodos = todos.map((todo) => 
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const editTask = (id, value) => {
      if (value.trim().length > 0) {
      const updatedTodos = todos.map((todo) => 
        todo.id === id ? { ...todo, task: value.charAt(0).toUpperCase() + value.slice(1), isEditing: !todo.isEditing } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      } else {
        alert("Enter a Valid Task");
      }
    };

    const modeSwitch = () => {
      const body = document.querySelector("body");
      const mode = document.querySelector(".mode-switch");
      body.classList.toggle("dark");
      const isDarkMode = body.classList.contains("dark");
      mode.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
      localStorage.setItem('mode', isDarkMode ? "Dark Mode" : "Light Mode");
    };

  return (
    <div>
      <div className='todoWrapper'>
          <h1>Get Things Done!</h1>
          <TodoForm addTodo={addTodo}/>
          {todos.map((todo) => todo.isEditing ? (
            <TodoEditForm key={todo.id} todo={todo} editTask={editTask}/>) 
            : (
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editForm={editForm} toggleComplete={toggleComplete}/>)
          )}
      </div>
      <div className="mode-switch" onClick={modeSwitch}>
        Dark Mode
      </div>
    </div>
  );
};

export default TodoWrapper;