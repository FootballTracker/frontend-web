'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExcluirUsuario() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
        router.push('/login');
        return;
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/users/me', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ password }), // Envia a senha para confirmação
        });
        if (response.ok) {
            alert('Conta excluída com sucesso.');
            localStorage.removeItem('accessToken'); // Remove o token
            router.push('/login'); // Redireciona para o login
        } else {
            const data = await response.json();
            setError(data.detail || 'Erro ao excluir usuário');
        }
    } catch (err) {
        setError('Erro de conexão com o servidor');
    }
};

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex justify-center items-center px-4">
      <div className="bg-[#2b2b2b] rounded-xl p-8 w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Excluir Conta</h1>
        <p className="text-sm text-gray-300 text-center mb-6">
          Esta ação é <span className="text-red-500 font-semibold">irreversível</span>. Confirme sua senha para excluir sua conta.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Senha atual</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"
              placeholder="Digite sua senha"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.push('/perfil')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded w-full"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
            >
              Confirmar exclusão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}