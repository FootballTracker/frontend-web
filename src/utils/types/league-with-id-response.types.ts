export interface League {
  id: number;
  name: string;
  season: number;
  logo_url: string;
  is_favorite: boolean;
  api_id: number;
}

export interface Season {
  id: number;
  season: number;
}

export interface LeagueDetailsResponse {
  league: League;
  seasons: Season[];
}