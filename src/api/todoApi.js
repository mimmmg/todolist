// src/api/todoApi.js
// API 호출 관련 로직
const API_URL = 'http://localhost:4000/todos'; // API URL

export const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        // 응답이 실패했을 때의 처리
        const errorText = await response.text(); // 오류 메시지 읽기
        throw new Error(`Error fetching todos: ${response.status} - ${errorText}`);
      }
      return response.json(); // JSON 데이터 반환
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('Fetch error:', error);
      throw new Error(`Fetch error: ${error.message}`); // 에러를 던짐
    }
  };

export const addTodo = async (newTodo) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({ task: newTodo }), // 새로운 Todo 추가
  });
  if (!response.ok) {
    throw new Error('Error adding todo'); 
  }
  return response.json(); 
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting todo'); 
  }
  return true; // 삭제 성공 시 true 반환
};

export const toggleCheckTodo = async (id, completed) => {
  const response = await fetch(`${API_URL}/${id}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed }),
  });
  if (!response.ok) {
    throw new Error('Error updating todo'); 
  }
  return true; // 업데이트 성공 시 true 반환
};
