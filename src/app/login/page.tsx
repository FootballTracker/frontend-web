'use client';

import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    const payload = usernameOrEmail.includes('@')
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // ✅ Redireciona para dashboard, home ou qualquer página
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Erro no login');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#2c2c2c] p-10 rounded-2xl shadow-lg w-[400px]">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="text-center text-white text-xl font-bold mb-2">LOGIN</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Faça login para personalizar sua experiência com jogadores, ligas e times favoritos.
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário ou Email"
            className="w-full px-4 py-2 rounded-full bg-[#1e1e1e] text-white border border-gray-600 focus:border-green-500"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 rounded-full bg-[#1e1e1e] text-white border border-gray-600 focus:border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md"
          >
            <FaSignInAlt /> Entrar
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-4">
          Ainda não tem uma conta?{' '}
          <a href="/signup" className="text-green-500 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
