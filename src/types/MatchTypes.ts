export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: number;
}

export interface NewMatchFormProps {
  onStartMatch: (homeTeam: string, awayTeam: string) => void;
}

export interface MatchListProps {
  matches: Match[];
  onUpdateScore: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => void;
  onFinishMatch: (matchId: string) => void;
}

export interface MatchInProgressProps {
  match: Match;
  onUpdateScore: (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => void;
  onFinishMatch: (matchId: string) => void;
}
