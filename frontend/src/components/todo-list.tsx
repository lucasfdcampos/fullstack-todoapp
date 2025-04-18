'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Todo } from '@/types';
import TodoForm from './todo-form';
import TodoItem from './todo-item';
import { LogOut } from 'lucide-react';

export function TodoList() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');

  // Helper to get auth token from localStorage with improved validation
  const getAuthToken = (): string | null => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        console.warn('No user data found in localStorage');
        return null;
      }

      const user = JSON.parse(userData);
      const token = user.token || user.access_token || null;

      if (!token || typeof token !== 'string' || token.length < 10) {
        console.warn('Invalid token found');
        return null;
      }

      if (user.username) {
        setUsername(user.username);
      }

      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // Helper to create headers with auth token
  const createAuthHeaders = () => {
    const token = getAuthToken();

    if (!token) {
      console.warn('No authentication token found for headers');
      return {
        'Content-Type': 'application/json',
      };
    }

    // Create headers with token
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // Log headers for debugging (hiding full token)
    const debugHeaders = {
      ...headers,
      Authorization: headers.Authorization.substring(0, 15) + '...',
    };
    console.log('Auth headers created:', debugHeaders);

    return headers;
  };

  // Check authentication on mount
  useEffect(() => {
    console.log('======= TodoList: Authentication Check =======');
    const token = getAuthToken();
    console.log('Token exists:', !!token);

    if (!token) {
      console.log('No valid token found, redirecting to login');
      router.push('/');
      return;
    }

    // Verify token format
    try {
      const authHeader = `Bearer ${token}`;
      console.log(
        'Authorization header format:',
        authHeader.substring(0, 15) + '...'
      );

      console.log('User is authenticated, setting state');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token validation error:', error);
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated is true, fetching todos');
      fetchTodos();
    } else {
      console.log('Not authenticated yet, skipping fetch');
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    if (!isAuthenticated) {
      console.log('fetchTodos: Not authenticated, returning early');
      return;
    }

    // Double-check token before proceeding
    const token = getAuthToken();
    if (!token) {
      console.error(
        'fetchTodos: Token validation failed, redirecting to login'
      );
      router.push('/');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const headers = createAuthHeaders();

      const response = await fetch(`/api/todos`, {
        headers,
      });

      console.log('Response status:', response.status);

      if (response.status === 401) {
        console.error('Authentication error, redirecting to login');
        router.push('/');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(
          `Falha ao carregar tarefas: ${response.status} ${
            errorText || response.statusText
          }`
        );
      }

      const data = await response.json();
      console.log('Todos recebidos:', data);

      // Handle both array and object responses
      setTodos(data);
     
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(
        'Não foi possível carregar suas tarefas. Por favor, tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`/api/todos/`, {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify({ title, description }),
      });

      if (response.status === 401) {
        router.push('/');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao criar tarefa');
      }

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(
        'Não foi possível adicionar a tarefa. Por favor, tente novamente.'
      );
      throw err;
    }
  };

  const updateTodo = async (id: number, title: string, description: string) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: createAuthHeaders(),
        body: JSON.stringify({ title, description }),
      });

      if (response.status === 401) {
        router.push('/');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao atualizar tarefa');
      }

      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      console.error('Error updating todo:', err);
      setError(
        'Não foi possível atualizar a tarefa. Por favor, tente novamente.'
      );
      throw err;
    }
  };

  const toggleTodo = async (id: number) => {
    if (!isAuthenticated) return;

    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const completed = !todo.completed;

      const response = await fetch(`/api/todos/${id}/completed?completed=${completed}`, {
        method: 'PATCH',
        headers: createAuthHeaders(),
      });

      if (response.status === 401) {
        router.push('/');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao atualizar status da tarefa');
      }

      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError(
        'Não foi possível atualizar o status da tarefa. Por favor, tente novamente.'
      );
      throw err;
    }
  };

  const deleteTodo = async (id: number) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: createAuthHeaders(),
      });

      if (response.status === 401) {
        router.push('/');
        return;
      }

      if (!response.ok) {
        throw new Error('Falha ao excluir tarefa');
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(
        'Não foi possível excluir a tarefa. Por favor, tente novamente.'
      );
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="card-container w-full max-w-3xl mx-auto">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Minhas Tarefas</h2>
        <div className="flex items-center gap-3">
          {username && (
            <span className="text-sm font-medium">
              Olá, <span className="text-primary">{username}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="btn-primary flex items-center gap-1 px-3 py-1"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M5.07 19h13.86c.67 0 1.1-.74.77-1.3L13.41 4.4a1 1 0 00-1.82 0L4.3 17.7a1 1 0 00.77 1.3z"
              />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <TodoForm onAddTodo={addTodo} />

        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span>Carregando tarefas...</span>
          </div>
        ) : todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
}
