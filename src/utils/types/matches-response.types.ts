export interface MatchTeam {
  id: number | null;
  score: number;
  logo: string;
  name: string;
}

export interface Match {
  id: number;
  home_team: MatchTeam;
  away_team: MatchTeam;
  date: string; // ou Date, se for convertido
}

export type MatchesResponse = Match[];