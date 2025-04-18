'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.detail || data?.message || 'Erro no cadastro');
      }

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao registrar. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-container w-full max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col space-y-1.5 mb-6">
        <h1 className="text-2xl font-bold text-primary dark:text-primary-foreground">Cadastro</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Crie uma nova conta para começar a usar o sistema</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm p-3 rounded-md mb-4 border border-red-300 dark:border-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome de usuário
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            placeholder="Digite seu nome de usuário"
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="Digite seu e-mail"
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Digite sua senha"
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Confirme sua senha"
            className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <button type="submit" className="btn-primary w-full flex justify-center items-center mt-6" disabled={isLoading}>
          {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Cadastrar"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        Já tem uma conta?{" "}
        <Link href="/" className="text-primary dark:text-primary-foreground hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  )
}
