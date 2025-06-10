"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { IoIosFootball } from "react-icons/io";
import { TeamDetailsResponse } from "@/utils/types/team-with-id-response.types";
import MatchCard from "../MatchCard";

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
  const [team, setTeam] = useState<TeamDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<TeamDetailsResponse>(
          `http://localhost:8000/teams/${team_id}?user_id=99`
        );
        setTeam(response.data);
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

  if (isLoading || !team) {
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
      {/* nome do time */}
      <div className="flex justify-between items-center gap-16">
        <div className="flex items-center gap-4">
          {team.team.logo && (
            <Image src={team.team.logo} height={32} width={32} alt="Logo do time" />
          )}
          <span className="text-[28px]">{team.team.name}</span>
        </div>
        <FaStar size={36} color={team.team.is_favorite ? "#FFD700" : "#933038"} />
      </div>

      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[32px] border-b border-red pb-5">
          <IoIosFootball size={36} color="#933038" />
          <h2>Últimas partidas</h2>
        </div>

        <div className="flex flex-col w-full gap-2">
          {team.last_matches.map((match) => (
            <MatchCard key={match.id} matchInfo={match} />
          ))}
        </div>
      </section>
    </main>
  );
}
