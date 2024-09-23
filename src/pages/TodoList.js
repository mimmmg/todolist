import React, { useState, useEffect } from 'react';
///import { Link } from 'react-router-dom';
///import { getPosts } from '../postData';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // 새 To-Do 입력 상태

  // 서버에서 모든 todo 가져오기
  const fetchTodos = async () =>{
    try {
      const response = await fetch('http://localhost:4000/api/todos'); // 서버 URL
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(()=> {
    fetchTodos();
  }, []);


  //새로운 Todo 추가
  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTodo }),
      });
      
      const newTodoItem = await response.json();

      setTodos([...todos, newTodoItem]); // 새로운 항목을 기존 목록에 추가
      setNewTodo(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


// todo 삭제
const deleteTodo = async (id) => {
  if (window.confirm('Are you sure you want to delete this todolist?')) {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id)); // 삭제된 항목 제외
      } else {
        throw new Error('Failed to delete todo.');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('An error occurred while deleting the todo.');
    }
  } else {
    // 사용자 취소시의 추가 작업이 필요할 경우 여기에 작성
    alert('Todo deletion was cancelled.');
  }
};

  const toggleCheckTodo = async (id, completed) => {
    //post method의 body에 원하는 상태의 completed값을 넣어서 전달
    try {
      await fetch(`http://localhost:4000/todos/${id}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
      type="text" 
      value={newTodo}
      onChange={(e)=> setNewTodo(e.target.value)} 
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.completed ? <del>{todo.task}</del> : todo.task}
            <input 
            type="checkbox" 
            checked={todo.completed} // 체크박스 상태 추가
            onChange={() => toggleCheckTodo(todo._id, todo.completed)}
            />
            <button onClick={() => toggleCheckTodo(todo._id, todo.completed)}>
            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;