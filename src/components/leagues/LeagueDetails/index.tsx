"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { LeagueDetailsResponse } from "@/utils/types/league-with-id-response.types";
import { MatchesResponse } from "@/utils/types/matches-response.types";

export interface Team {
  id: number;
  name: string;
  logo: string;
  is_favorite: boolean;
}

interface ILeagueDetailsProps {
  league_id: string;
}

export default function LeagueDetails({ league_id }: ILeagueDetailsProps) {
  const [round, setRound] = useState(1);
  const [matches, setMatches] = useState<MatchesResponse | null>(null);
  const [league, setLeague] = useState<LeagueDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeague = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<LeagueDetailsResponse>(
        `http://localhost:8000/league?league_id=${league_id}&user_id=1`
      );
      setLeague(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error fetching team:", error);
      if (error.response?.status === 404) {
        setError("Liga não encontrada.");
      } else {
        setError("Não foi possível carregar os dados da liga.");
      }
    }
  };

  const fetchMatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<MatchesResponse>(
        `http://localhost:8000/matches?round=${round}&id=${league_id}&season=2023`
      );
      setMatches(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error fetching team:", error);
      if (error.response?.status === 404) {
        setError("Partidas não encontradas.");
      } else {
        setError("Não foi possível carregar os dados das partidas.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (league_id) {
      fetchLeague();
      fetchMatches();
    }
  }, [league_id]);

  if (isLoading || !league) {
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
      <div className="flex justify-between items-center gap-16 w-fit">
        <div className="flex items-center gap-4">
          {league.league.logo_url && (
            <Image
              src={league.league.logo_url}
              height={32}
              width={32}
              alt="Logo do time"
            />
          )}
          <span className="text-[28px]">{league.league.name}</span>
        </div>
      </div>

      <section className="flex gap-8">{/* ultimas partidas */}</section>
    </main>
  );
}
