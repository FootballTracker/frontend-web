import { League } from "@/utils/types/league-with-id-response.types";
import Image from "next/image";
import Link from "next/link";

interface ILeagueCard {
  league: League;
  description?: string;
}

export default function LeagueCard({ league,description }: ILeagueCard) {
  return (
    <Link
      href={`/ligas/${league.id}`}
      className="px-3 py-5 flex flex-col gap-2 items-center text-white bg-red rounded-lg border border-white min-w-[240px] hover:scale-105 transition-all cursor-pointer"
    >
      <Image
        src={league.logo_url}
        height={110}
        width={110}
        alt="Logo da liga"
      />

      <div className="flex flex-col self-start">
        <span className="text-2xl">{league.name}</span>
        <span className="text-xs">{description}</span>
      </div>
    </Link>
  );
}
