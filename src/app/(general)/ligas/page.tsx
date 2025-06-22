"use client";

import LeaguesTable from "@/components/leagues/LeaguesTable";
import FavoriteList from "@/components/teams/FavoriteList";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export interface League {
  id: number;
  name: string;
  season: number;
  logo_url: string;
  is_favorite: boolean;
  api_id: number;
}

export default function LigasPage() {
  const [leagues, setLeagues] = useState<League[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/leagues?user_id=99",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response) setLeagues(response.data.all_leagues);
      } catch (error) {
        console.error("Error fetching leagues");
      }
    };

    fetchLeagues();
  }, []);

  // Filtra as ligas baseado na pesquisa (case-insensitive)
  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex flex-col gap-6 py-7 px-10 overflow-y-scroll w-full">
      <h1 className="text-white text-3xl">Ligas</h1>

      <div className="flex gap-2 bg-light-background px-2.5 py-2 rounded-lg border border-black text-white max-w-[500px]">
        <FaSearch size={24} color="white" />
        <input
          type="text"
          placeholder="Pesquise por liga..."
          className="outline-none focus:outline-none bg-transparent w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {filteredLeagues.map((league) => (
            <Link
              key={league.id}
              href={`/times/${league.id}`}
              className="bg-red rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center hover:scale-105 transition-all cursor-pointer"
            >
              <img
                src={league.logo_url}
                alt={league.name}
                className="w-16 h-16 object-contain"
              />
              <p className="text-white font-semibold">{league.name}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex gap-16">
          <FavoriteList listOf={leagues} type="league"/>
          <LeaguesTable leagues={leagues} />
        </div>
      )}
    </main>
  );
}
