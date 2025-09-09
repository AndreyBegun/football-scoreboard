import type { MatchInProgressProps } from "../types/MatchTypes";

export const MatchInProgress = ({
  match,
  onFinishMatch,
  onUpdateScore,
}: MatchInProgressProps) => {
  return (
    <li key={match.id} className="match-item">
      <div className="match-info">
        <span className="team-name">{match.homeTeam}</span>
        <input
          className="score-input"
          type="number"
          min="0"
          value={match.homeScore}
          onChange={(e) =>
            onUpdateScore(
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
            onUpdateScore(
              match.id,
              match.homeScore,
              parseInt(e.target.value) || 0
            )
          }
          aria-label={`${match.awayTeam} score`}
        />
        <span className="team-name">{match.awayTeam}</span>
      </div>
      <button onClick={() => onFinishMatch(match.id)} className="finish-btn">
        Finish
      </button>
    </li>
  );
};
