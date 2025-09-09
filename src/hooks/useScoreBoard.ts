
import { useState } from 'react';
import type { Match } from '../types/Match';

export const useScoreboard = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  const startNewMatch = (homeTeam: string, awayTeam: string) => {
    const newMatch: Match = {
      id: Math.random().toString(36).substr(2, 9), 
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: Date.now(),
    };
    setMatches(prevMatches => [...prevMatches, newMatch]);
  };

  const summary = matches;

  return { summary, startNewMatch };
};