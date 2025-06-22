"use client";

import { GoTrophy } from "react-icons/go";
import LeagueCard from "../LeagueCard";
import { League } from "@/app/(general)/times/page";

interface ILeaguesList {
  leagues: League[];
}

export default function LeaguesList({ leagues }: ILeaguesList) {
  return (
    <section className="flex flex-col gap-8 text-white ">
      <div className="flex items-center gap-2 text-[32px] border-b border-red pb-5">
        <GoTrophy size={36} color="#933038" />
        <h2>Ligas</h2>
      </div>

      <div className="flex gap-4 flex-wrap">
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            logo={league.logo_url}
            name={league.name}
          />
        ))}
      </div>
    </section>
  );
}
