import { useState, useEffect } from 'react';
import { fetchTodos } from '../api/todoApi';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    loadTodos();
  }, []);

  return [todos, setTodos];
};
