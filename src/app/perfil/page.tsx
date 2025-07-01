'use client';

import { useRouter } from 'next/navigation';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface UserProfile {
    username: string;
    email: string;
}

export default function Perfil() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/users/me', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    setUser(await response.json());
                } else {
                    localStorage.removeItem('access_token');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };
        fetchUserProfile();
    }, [router]);

    if (!user) return <div className="min-h-screen bg-[#1e1e1e] text-white p-6">Carregando perfil...</div>;

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white p-6">
            <div className="mb-6 text-lg font-semibold">&larr; Perfil</div>
            <div className="bg-[#2b2b2b] rounded-xl p-8 flex flex-col items-center">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center text-black text-5xl">
                        <FaUserEdit />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold">{user.username}</h2>
                </div>
                {/* Lembre-se de substituir o conteúdo estático dos favoritos pela lógica de fetch no futuro */}
                <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <button onClick={() => router.push('/perfil/editar')} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full flex items-center gap-2 text-white">
                        <FaUserEdit /> Editar dados
                    </button>
                    <button onClick={() => router.push('/perfil/excluir')} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full flex items-center gap-2 text-white">
                        <FaTrashAlt /> Excluir usuário
                    </button>
                </div>
            </div>
        </div>
    );
}