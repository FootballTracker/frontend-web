"use client";

import FavoriteTeams from "@/components/teams/FavoriteTeams";
import LeaguesList from "@/components/teams/LeaguesList";
import axios from "axios";
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

export interface Team {
  id: number;
  name: string;
  logo: string;
  is_favorite: boolean;
}

export default function TimesPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>([]);

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

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/teams?user_id=99",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response) {
          setTeams(response.data.teams);
          setFavoriteTeams(response.data.favorite_team);
        }
      } catch (error) {
        console.error("Error fetching leagues");
      }
    };

    fetchTeams();
  }, []);

  return (
    <main className="flex flex-col gap-6 py-7 px-10 overflow-y-scroll">
      <h1 className="text-white text-3xl">Times</h1>

      <div className="flex gap-2 bg-light-background px-2.5 py-2 rounded-lg border border-black text-white max-w-[500px]">
        <FaSearch size={24} color="white" />
        <input
          type="text"
          placeholder="Pesquise seu time..."
          className="outline-none focus:outline-none"
        />
      </div>

      <div className="flex gap-16">
        <FavoriteTeams teams={favoriteTeams}/>

        <LeaguesList leagues={leagues} />
      </div>
    </main>
  );
}
