import { useScoreboard } from "../hooks/useScoreBoard";
import { NewMatchForm } from "./NewMatchForm";
import { MatchList } from "./MatchList";

export const Scoreboard = () => {
  const { summary, startNewMatch, updateScore, finishMatch } = useScoreboard();

  return (
    <div className="scoreboard-container">
      <h1>Live Football Scoreboard</h1>

      <NewMatchForm onStartMatch={startNewMatch} />

      <MatchList
        matches={summary}
        onUpdateScore={updateScore}
        onFinishMatch={finishMatch}
      />
    </div>
  );
};
