import LeagueDetails from "@/components/leagues/LeagueDetails";

interface ILeaguePage {
  params: {
    league_id: string;
  };
}

export default function LeaguePage({ params }: ILeaguePage) {
    return <LeagueDetails league_id={params.league_id} />
}