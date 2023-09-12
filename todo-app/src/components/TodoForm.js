import React, { useState } from 'react';
import '../App.css';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
    }
  };

  return (
    <div className='first'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          className='hey'
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TodoForm;
