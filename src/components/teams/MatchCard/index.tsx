import Image from "next/image";
import { LastMatch } from "@/utils/types/team-with-id-response.types";

interface IMatchCard {
  matchInfo: LastMatch;
  hourFormat?: boolean;
}

export default function MatchCard({ matchInfo, hourFormat = false }: IMatchCard) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-2 items-center border border-red rounded-xl py-2 px-3">
      <span className="text-xs text-red">
        {hourFormat
          ? new Date(matchInfo.date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : new Date(matchInfo.date).toLocaleDateString("pt-BR")}
      </span>

      {/* time da casa */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={matchInfo.home_team.logo}
          width={32}
          height={32}
          alt={`Logo do time ${matchInfo.home_team.name}`}
        />
        <span className="text-sm text-center">{matchInfo.home_team.name}</span>
      </div>

      {/* placar */}
      <div className="mx-10">
        <span className="whitespace-nowrap">{`${matchInfo.home_team.score} X ${matchInfo.away_team.score}`}</span>
      </div>
      
      {/* time de fora */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={matchInfo.away_team.logo}
          width={32}
          height={32}
          alt={`Logo do time ${matchInfo.away_team.name}`}
        />
        <span className="text-sm text-center">{matchInfo.away_team.name}</span>
      </div>
    </div>
  );
}
