import React, { useState } from "react";
import { useScoreboard } from "../hooks/useScoreBoard";
import type { Match } from "../types/Match";

export const Scoreboard = () => {
  const { summary, startNewMatch, updateScore, finishMatch } = useScoreboard();

  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const handleStartMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam.trim() && awayTeam.trim()) {
      startNewMatch(homeTeam, awayTeam);

      setHomeTeam("");
      setAwayTeam("");
    }
  };

  return (
    <div className="scoreboard-container">
      <h1>Live Football Scoreboard</h1>

      <div className="card">
        <h2>Start New Match</h2>
        <form onSubmit={handleStartMatch} className="new-match-form">
          <input
            type="text"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            placeholder="Home Team"
            required
          />
          <span className="form-separator">vs</span>
          <input
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            placeholder="Away Team"
            required
          />
          <button type="submit">Start Match</button>
        </form>
      </div>

      <div className="card">
        <h2>Summary</h2>
        {summary.length === 0 ? (
          <p>No matches in progress.</p>
        ) : (
          <ul className="match-list">
            {summary.map((match: Match) => (
              <li key={match.id} className="match-item">
                <div className="match-info">
                  <span className="team-name">{match.homeTeam}</span>
                  <input
                    className="score-input"
                    type="number"
                    min="0"
                    value={match.homeScore}
                    onChange={(e) =>
                      updateScore(
                        match.id,
                        parseInt(e.target.value) || 0,
                        match.awayScore
                      )
                    }
                    aria-label={`${match.homeTeam} score`}
                  />
                  <span className="score-separator">-</span>
                  <input
                    className="score-input"
                    type="number"
                    min="0"
                    value={match.awayScore}
                    onChange={(e) =>
                      updateScore(
                        match.id,
                        match.homeScore,
                        parseInt(e.target.value) || 0
                      )
                    }
                    aria-label={`${match.awayTeam} score`}
                  />
                  <span className="team-name">{match.awayTeam}</span>
                </div>
                <button
                  onClick={() => finishMatch(match.id)}
                  className="finish-btn"
                >
                  Finish
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
