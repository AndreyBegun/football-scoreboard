import { useState, useMemo } from "react";
import type { Match } from "../types/MatchTypes";

export const useScoreboard = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  const startNewMatch = (homeTeam: string, awayTeam: string) => {
    const newMatch: Match = {
      id: Math.random().toString(36).substring(2, 9),
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: Date.now(),
    };
    setMatches((prevMatches) => [...prevMatches, newMatch]);
  };

  const updateScore = (
    matchId: string,
    homeScore: number,
    awayScore: number
  ) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId ? { ...match, homeScore, awayScore } : match
      )
    );
  };

  const finishMatch = (matchId: string) => {
    setMatches((prevMatches) =>
      prevMatches.filter((match) => match.id !== matchId)
    );
  };

  const summary = useMemo(() => {
    const sortedMatches = [...matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA;
      }
      return b.startTime - a.startTime;
    });
    return sortedMatches;
  }, [matches]);

  return { summary, startNewMatch, updateScore, finishMatch };
};
