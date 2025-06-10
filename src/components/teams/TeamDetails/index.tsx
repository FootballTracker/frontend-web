"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios, { AxiosError } from "axios";

export interface Team {
  id: number;
  name: string;
  logo: string;
  is_favorite: boolean;
}

interface ITeamDetailsProps {
  team_id: string;
}

export default function TeamDetails({ team_id }: ITeamDetailsProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/teams/${team_id}?user_id=99`
        );
        setTeam(response.data.team);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error fetching team:", error);
        if (error.response?.status === 404) {
          setError("Time não encontrado.");
        } else {
          setError("Não foi possível carregar os dados do time.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (team_id) {
      fetchTeam();
    }
  }, [team_id]);

  if (isLoading) {
    return (
      <main className="flex justify-center">
        <span className="text-white text-xl">Carregando...</span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center">
        <span className="text-red-500 text-xl">{error}</span>
      </main>
    );
  }
  
  return (
    <main className="flex flex-col gap-8 p-10 text-white">
      {team && (
         <div className="flex justify-between items-center gap-16">
            <div className="flex items-center gap-4">
              {team.logo && <Image src={team.logo} height={32} width={32} alt="Logo do time" />}
              <span className="text-[28px]">{team.name}</span>
            </div>
            <FaStar size={36} color={team.is_favorite ? "#FFD700" : "#933038"} />
          </div>
      )}
    </main>
  );
}