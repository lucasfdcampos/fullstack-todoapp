'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ApiError, LoginResponse, User } from '@/types';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validação simples
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Capturar resposta como texto para debug
      const responseText = await response.text();
      console.log('Resposta bruta:', responseText);

      // Tentar converter para JSON
      let data;
      try {
        data = JSON.parse(responseText) as LoginResponse | ApiError;
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta JSON:', parseError);
        throw new Error('Resposta inválida do servidor');
      }

      if (!response.ok) {
        // Tratar como ApiError
        const errorData = data as ApiError;
        throw new Error(
          errorData.detail || errorData.message || 'Falha na autenticação'
        );
      }

      const authData = data as LoginResponse;
      const token = authData.access_token;
      if (!token) {
        console.error('Token não encontrado na resposta:', authData);
        throw new Error('Token de autenticação não encontrado na resposta');
      }

      const user: User = {
        username: username,
        token: token,
      };

      localStorage.setItem('user', JSON.stringify(user));
      router.push('/todos');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-container w-full max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-primary dark:text-primary-foreground mb-6 text-center">Login</h1>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 mb-2">
            Nome de usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="btn-primary w-full flex justify-center items-center mt-6" disabled={isLoading}>
          {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Entrar"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary dark:text-primary-foreground hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
