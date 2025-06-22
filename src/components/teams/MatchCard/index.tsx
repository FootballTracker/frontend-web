import Image from "next/image";
import { LastMatch } from "@/utils/types/team-with-id-response.types";

interface IMatchCard {
  matchInfo: LastMatch;
}

export default function MatchCard({ matchInfo }: IMatchCard) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-2 items-center border border-red rounded-xl py-2 px-3">
      <span className="text-xs text-red">{new Date(matchInfo.date).toLocaleDateString("pt-BR")}</span>

      {/* time da casa */}
      <div className="flex flex-col items-center">
        <Image
          src={matchInfo.home_team.logo}
          width={32}
          height={32}
          alt={`Logo do time ${matchInfo.home_team.name}`}
        />
        <span className="text-sm">{matchInfo.home_team.name}</span>
      </div>

      {/* placar */}
      <div className="mx-10">
        <span>{`${matchInfo.home_team.score} X ${matchInfo.away_team.score}`}</span>
      </div>
      
      {/* time de fora */}
      <div className="flex flex-col items-center">
        <Image
          src={matchInfo.away_team.logo}
          width={32}
          height={32}
          alt={`Logo do time ${matchInfo.away_team.name}`}
        />
        <span className="text-sm">{matchInfo.away_team.name}</span>
      </div>
    </div>
  );
}
