import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    onUpdate(todo.id, updatedText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={e => setUpdatedText(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleToggleEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          {todo.text}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleToggleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
