'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditarPerfil() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
        router.push('/login');
        return;
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/users/me', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: username || undefined, // Envia undefined se o campo estiver vazio para não alterar
                email: email || undefined,
                new_password: newPassword || undefined,
                current_password: currentPassword, // Senha atual é sempre obrigatória
            }),
        });
        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
            router.push('/perfil');
        } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.detail}`);
        }
    } catch (error) {
        alert('Erro de conexão com o servidor.');
    }
};

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex justify-center items-center px-4">
      <div className="bg-[#2b2b2b] rounded-xl p-8 w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome de usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"
              placeholder="Novo nome de usuário"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"
              placeholder="Novo email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"
              placeholder="Digite sua senha atual"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nova senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] border border-gray-600 text-white"
              placeholder="Nova senha (opcional)"
            />
          </div>

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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
