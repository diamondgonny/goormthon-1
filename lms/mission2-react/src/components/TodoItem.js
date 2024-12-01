import React, { useState, useEffect, useRef } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, editingTodoId, onEditingChange, onUpdate, onDelete }) => {
  const [text, setText] = useState(todo.text);
  const [originalText, setOriginalText] = useState(todo.text);
  const inputRef = useRef(null);

  // 현재 아이템이 편집 중인지 확인
  const isEditing = editingTodoId === todo.id;

  // editing 상태 변경시 focus
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCheckboxChange = (e) => {
    onUpdate({ ...todo, complete: e.target.checked });
  };

  const startEditing = () => {
    onEditingChange(todo.id); // 상위 컴포넌트에 현재 편집 중인 id 알림
    setOriginalText(text);
  };

  const finishEditing = () => {
    onEditingChange(null);
    onUpdate({ ...todo, text });
  };

  const cancelEditing = () => {
    onEditingChange(null);
    setText(originalText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className={`todoItem ${todo.complete ? 'todoItemComplete' : ''} ${isEditing ? 'todoItemEditing' : ''}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.complete}
        onChange={handleCheckboxChange}
      />
      <input
        type="text"
        className="todoInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!isEditing}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <div className="actionButtons">
        {!isEditing ? (
          <button className="actionButton material-icons" onClick={startEditing}>
            edit
          </button>
        ) : (
          <>
            <button className="actionButton actionButtonDone material-icons" onClick={finishEditing}>
              done
            </button>
            <button className="actionButton actionButtonCancel material-icons" onClick={cancelEditing}>
              close
            </button>
          </>
        )}
        <button className="actionButton material-icons" onClick={() => onDelete(todo)}>
          remove_circle
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
