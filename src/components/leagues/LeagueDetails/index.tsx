"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { LeagueDetailsResponse } from "@/utils/types/league-with-id-response.types";
import { Match, MatchesResponse } from "@/utils/types/matches-response.types";
import MatchCard from "@/components/teams/MatchCard"; 
import { FaRegCalendarAlt } from "react-icons/fa";

export interface Team {
  id: number;
  name: string;
  logo: string;
  is_favorite: boolean;
}

interface ILeagueDetailsProps {
  league_id: string;
}

// Função para agrupar partidas por data
const groupMatchesByDate = (matches: MatchesResponse) => {
  if (!matches) return {};
  return matches.reduce((acc, match) => {
    const date = new Date(match.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {} as Record<string, MatchesResponse>);
};


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
      console.error("Error fetching league:", error);
      if (error.response?.status === 404) {
        setError("Liga não encontrada.");
      } else {
        setError("Não foi possível carregar os dados da liga.");
      }
    }
  };

  const fetchMatches = async (currentRound: number) => {
    // Modificado para não resetar tudo e receber a rodada
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<MatchesResponse>(
        `http://localhost:8000/matches?round=${currentRound}&id=${league_id}&season=2023` 
      );
      setMatches(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error fetching matches:", error);
      if (error.response?.status === 404) {
        setMatches([]); // Define como vazio para não mostrar erro, mas sim "sem partidas"
      } else {
        setError("Não foi possível carregar os dados das partidas.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Efeito para buscar os dados iniciais
  useEffect(() => {
    if (league_id) {
      fetchLeague();
      fetchMatches(round);
    }
  }, [league_id]);

  // Efeito para buscar partidas quando a rodada muda
  useEffect(() => {
    if (league_id) {
        fetchMatches(round);
    }
  }, [round]);

  const handleRoundChange = (direction: 'prev' | 'next') => {
    setRound(currentRound => {
        const newRound = direction === 'prev' ? currentRound - 1 : currentRound + 1;
        return Math.max(1, newRound); // Evita rodadas menores que 1
    });
  };

  const groupedMatches = useMemo(() => {
    return matches ? groupMatchesByDate(matches) : {};
  }, [matches]);

  if (isLoading && !matches) { // Mostra carregando apenas na primeira vez
    return (
      <main className="flex justify-center p-10">
        <span className="text-white text-xl">Carregando...</span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center p-10">
        <span className="text-red-500 text-xl">{error}</span>
      </main>
    );
  }
  
  if (!league) return null; // Retorna nulo se a liga não foi carregada

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
              alt="Logo da liga"
            />
          )}
          <span className="text-[28px]">{league.league.name}</span>
        </div>
      </div>

      {/* Seção das Rodadas e Partidas */}
      <section className="flex flex-col gap-6">
        {/* Controle da Rodada */}
        <div className="flex items-center gap-4">
            <button onClick={() => handleRoundChange('prev')} className="text-2xl" disabled={round <= 1}>{"<"}</button>
            <span className="text-xl w-28 text-center">Rodada {round}</span>
            <button onClick={() => handleRoundChange('next')} className="text-2xl">{">"}</button>
        </div>

        {isLoading && <div className="text-center">Carregando partidas...</div>}

        {/* Container das Partidas */}
        <div className="flex gap-x-8 max-w-10/12 overflow-x-scroll w-full scrollbar scrollbar-thumb-red">
            {Object.keys(groupedMatches).length > 0 ? (
                 Object.entries(groupedMatches).map(([date, dayMatches]) => (
                    <div key={date} className="flex flex-col gap-4">
                        {/* Cabeçalho da Data */}
                        <div className="flex items-center gap-2 border-b border-red pb-8">
                            <FaRegCalendarAlt className="text-red"/>
                            <span className="font-semibold text-2xl">{date}</span>
                        </div>
                        {/* Lista de Partidas do Dia */}
                        <div className="flex flex-col gap-3">
                            {dayMatches.map((match: Match) => (
                                <MatchCard key={match.id} matchInfo={match} hourFormat/>
                            ))}
                        </div>
                    </div>
                 ))
            ) : (
                !isLoading && <p className="col-span-full text-center">Nenhuma partida encontrada para esta rodada.</p>
            )}
        </div>
      </section>
    </main>
  );
}