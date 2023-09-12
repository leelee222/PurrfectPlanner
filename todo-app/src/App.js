import React, { useState } from 'react';
import './App.css';
import './styles/Lightmode.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Clean the house' },
    // Add more initial todos as needed
  ]);

  const handleAddTodo = text => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleUpdateTodo = (id, updatedText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleToggleMode = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  };

  return (
    <div className="App">
      <div className='todo'>
        <h1>Todo App</h1>
          <button className='night' onClick={handleToggleMode}>Toggle Mode</button>
        <TodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      </div>
    </div>
  );
}

export default App;
