import TeamDetails from "@/components/teams/TeamDetails";

interface ITeamPage {
  params: {
    team_id: string;
  };
}

export default function TeamPage({ params }: ITeamPage) {
  return <TeamDetails team_id={params.team_id} />;
}
