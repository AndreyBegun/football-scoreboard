import type { MatchListProps } from "../types/MatchTypes";
import { MatchInProgress } from "./MatcInProgress";

export const MatchList = ({
  matches,
  onUpdateScore,
  onFinishMatch,
}: MatchListProps) => {
  return (
    <div className="card">
      <h2>Summary</h2>
      {matches.length === 0 ? (
        <p>No matches in progress.</p>
      ) : (
        <ul className="match-list">
          {matches.map((match) => (
            <MatchInProgress
              match={match}
              onFinishMatch={onFinishMatch}
              onUpdateScore={onUpdateScore}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
