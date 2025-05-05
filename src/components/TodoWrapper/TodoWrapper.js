import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import './TodoWrapper.css';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';
import TodoEditForm from '../TodoEditForm/TodoEditForm';


const TodoWrapper = () => {
    const [todos, setTodos] = useState(() => {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    });
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
      if (localStorage.getItem('mode') === "Dark Mode") {
        const body = document.querySelector("body");
        const mode = document.querySelector(".mode-switch");
        body.classList.add('dark');
        mode.textContent = 'Light Mode';
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (value) => {
      const newTodo = {
        id: uuidv4(),
        task: value.trim(),
        completed: false
      };

      if (newTodo.task.length > 0) {
        newTodo.task = newTodo.task.charAt(0).toUpperCase() + newTodo.task.slice(1);
        setTodos([...todos, newTodo]);

      } else {
        alert("Enter a Valid Task");
      }
    };

    const deleteTodo = (id) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }

    const toggleComplete = (id) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    };

    const editForm = (id) => {
      const todoToEdit = todos.find((todo) => todo.id === id);
      setEditingTodo(todoToEdit);
    };

    const editTask = (id, value) => {
      if (value.trim().length > 0) {
      const updatedTodos = todos.map((todo) => 
        todo.id === id ? { ...todo, task: value.charAt(0).toUpperCase() + value.slice(1) } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);

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
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editForm={editForm} toggleComplete={toggleComplete}/>)
          )}
      </div>
      {editingTodo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TodoEditForm todo={editingTodo} editTask={editTask} onCancel={() => setEditingTodo(null)} />
          </div>
        </div>
      )}
      <div className="mode-switch" onClick={modeSwitch}>
        Dark Mode
      </div>
    </div>
  );
};

export default TodoWrapper;