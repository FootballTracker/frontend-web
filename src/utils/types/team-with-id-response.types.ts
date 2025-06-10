// Interface para um jogador individual
export interface Player {
  id: number;
  player: string;
  playerImage: string;
}

// Interface para as informações do time principal
export interface TeamInfo {
  id: number;
  name: string;
  logo: string;
  founded: number;
  code: string;
  country: string;
  country_flag: string;
  is_favorite: boolean;
}

// Interface para as informações do estádio do time
export interface TeamVenue {
  address: string;
  name: string;
  city: string;
  capacity: number;
  surface: string;
  image_url: string;
}

// Interface para as informações da liga
export interface LeagueInfo {
  id: number;
  name: string;
  season: number;
  logo_url: string;
}

// Interface para um time dentro de uma partida (home ou away)
export interface MatchTeam {
  name: string;
  logo: string;
  score: number;
}

// Interface para uma das últimas partidas
export interface LastMatch {
  id: number;
  date: string; // ou Date, se for ser convertido
  home_team: MatchTeam;
  away_team: MatchTeam;
}

// Interface para a lista de jogadores por posição
export interface PlayersInfo {
  coach: string;
  coach_imagem: string;
  goalkeeper: Player[];
  defensor: Player[];
  mid_field: Player[];
  attacker: Player[];
}

// Interface principal para a resposta completa da rota
export interface TeamDetailsResponse {
  team: TeamInfo;
  team_venue: TeamVenue;
  leagues: LeagueInfo[];
  last_matches: LastMatch[];
  players: PlayersInfo;
}