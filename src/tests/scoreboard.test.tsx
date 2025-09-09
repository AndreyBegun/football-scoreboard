import { renderHook, act } from "@testing-library/react";
import { useScoreboard } from "../hooks/useScoreBoard";

describe("useScoreboard", () => {
  it("should start a new match with a score of 0-0", () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startNewMatch("Mexico", "Canada");
    });

    expect(result.current.summary.length).toBe(1);
    expect(result.current.summary[0]).toMatchObject({
      homeTeam: "Mexico",
      awayTeam: "Canada",
      homeScore: 0,
      awayScore: 0,
    });
  });

  it("should update the score of an existing match", () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startNewMatch("Spain", "Brazil");
    });

    const matchId = result.current.summary[0].id;

    act(() => {
      result.current.updateScore(matchId, 10, 2);
    });

    expect(result.current.summary[0].homeScore).toBe(10);
    expect(result.current.summary[0].awayScore).toBe(2);
  });

  it("should finish a match and remove it from the scoreboard", () => {
    const { result } = renderHook(() => useScoreboard());

    act(() => {
      result.current.startNewMatch("Germany", "France");
    });

    expect(result.current.summary.length).toBe(1);
    const matchId = result.current.summary[0].id;

    act(() => {
      result.current.finishMatch(matchId);
    });

    expect(result.current.summary.length).toBe(0);
  });
});
