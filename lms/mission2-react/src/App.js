import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem.js';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('my_todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodoId, setNewTodoId] = useState(null);  // 새로운 todo의 id를 추적
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    localStorage.setItem('my_todos', JSON.stringify(todos));
  }, [todos]);

  const createNewTodo = () => {
    const newId = new Date().getTime();
    const newTodo = {
      id: new Date().getTime(),
      text: '',
      complete: false
    };
    setTodos([newTodo, ...todos]);
    setNewTodoId(newId);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    if (updatedTodo.id === newTodoId) {
      setNewTodoId(null); // 업데이트 후 newTodoId 초기화
    }
  };

  const deleteTodo = (deletedTodo) => {
    setTodos(todos.filter(todo => todo.id !== deletedTodo));
    if (deletedTodo.id === newTodoId) {
      setNewTodoId(null); // 업데이트 후 newTodoId 초기화
    }
  };

  return (
    <main>
      <div className="container">
        <header className="header">
          <h1 className="headerTitle">Todos 앱</h1>
          <button className="headerButton" onClick={createNewTodo}>
            새로운 todo 추가하기
          </button>
        </header>
        <div className="todoList">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isNew={todo.id === newTodoId}
              editingTodoId={editingTodoId}
              onEditingChange={setEditingTodoId}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
