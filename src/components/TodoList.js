import React, { useState, useEffect } from 'react';  // 리액트 불러오기, useState 함수 사용하여 컴포넌트에서 상태 관리
import './TodoList.css'; // 스타일 파일 import
import { fetchTodos, addTodo, deleteTodo, toggleCheckTodo } from '../api/todoApi'; // API 호출 가져오기

function TodoList() {  
  const [todos, setTodos] = useState([]); 
  const [newTodo, setNewTodo] = useState(""); 

  // 서버에서 모든 todo 가져오기
  const loadTodos = async () =>{
    try {
      const data = await fetchTodos();  // todoApi.js의 fetchTodos 함수 호출
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(()=> {
    loadTodos();
  }, []);


  //새로운 Todo 추가
  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      const newTodoItem = await addTodo(newTodo);  // todoApi.js의 addTodo 함수 호출
      
      setTodos((prevTodos) => [...prevTodos, newTodoItem]); // 이전 상태를 안전하게 사용
      setNewTodo(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


// todo 삭제
const handleDeleteTodo = async (id) => {
  if (window.confirm('Are you sure you want to delete this todo?')) {
    try {
      await deleteTodo(id); // deleteTodo 함수 호출
      setTodos(todos.filter(todo => todo._id !== id)); // 상태 업데이트
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('An error occurred while deleting the todo.');
    }
  } else {
    // 사용자 취소시의 추가 작업이 필요할 경우 여기에 작성
    alert('Todo deletion was cancelled.');
  }
};


  const handleToggleCheckTodo = async (id, completed) => {
    //post method의 body에 원하는 상태의 completed값을 넣어서 전달
    try {
      await toggleCheckTodo(id, completed); // api.js의 toggleCheckTodo 함수 호출
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="todo-container"> 
      <h1 className="todo-title">Todo List</h1>
      <div className="input-container"> 
        <input
          className="todo-input" // CSS 클래스 추가
          type="text" 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') { // 엔터키를 눌렀는지 확인
              handleAddTodo(); // Todo 추가 함수 호출
            }
          }} // 엔터키 이벤트 추가
          placeholder="Add a new todo..." /> 
        <button className="add-button" onClick={handleAddTodo}>Add Todo</button> 
      </div>
      <ul className="todo-list"> 
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => handleToggleCheckTodo(todo._id, todo.completed)}
          />
          {todo.completed ? <del>{todo.task}</del> : todo.task}
          <button onClick={() => handleToggleCheckTodo(todo._id, todo.completed)}>
            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default TodoList;   // 이 코드는 TodoList 라는 컴포넌트를 내보내겠다는 의미입니다. 이렇게 해주면 다른 컴포넌트에서 불러와서 사용 할 수 있습니다.