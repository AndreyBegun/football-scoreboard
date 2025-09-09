import { useState } from "react";
import type { NewMatchFormProps } from "../types/MatchTypes";

export const NewMatchForm = ({ onStartMatch }: NewMatchFormProps) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeTeam.trim() && awayTeam.trim()) {
      onStartMatch(homeTeam, awayTeam);
      setHomeTeam("");
      setAwayTeam("");
    }
  };

  return (
    <div className="card">
      <h2>Start New Match</h2>
      <form onSubmit={handleSubmit} className="new-match-form">
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
  );
};
