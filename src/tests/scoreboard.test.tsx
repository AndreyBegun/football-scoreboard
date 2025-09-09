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

  it("should return summary ordered by total score and then by most recent start time", async () => {
    const { result } = renderHook(() => useScoreboard());
    const delay = () => new Promise((res) => setTimeout(res, 20));

    await act(async () => {
      result.current.startNewMatch("Mexico", "Canada");
      await delay();
      result.current.startNewMatch("Spain", "Brazil");
      await delay();
      result.current.startNewMatch("Germany", "France");
      await delay();
      result.current.startNewMatch("Uruguay", "Italy");
      await delay();
      result.current.startNewMatch("Argentina", "Australia");
    });

    act(() => {
      const findId = (h: string, a: string) =>
        result.current.summary.find(
          (m) => m.homeTeam === h && m.awayTeam === a
        )!.id;
      result.current.updateScore(findId("Mexico", "Canada"), 0, 5);
      result.current.updateScore(findId("Spain", "Brazil"), 10, 2);
      result.current.updateScore(findId("Germany", "France"), 2, 2);
      result.current.updateScore(findId("Uruguay", "Italy"), 6, 6);
      result.current.updateScore(findId("Argentina", "Australia"), 3, 1);
    });

    const summaryTeams = result.current.summary.map(
      (m) => `${m.homeTeam}-${m.awayTeam}`
    );

    const expectedOrder = [
      "Uruguay-Italy",
      "Spain-Brazil",
      "Mexico-Canada",
      "Argentina-Australia",
      "Germany-France",
    ];

    expect(summaryTeams).toEqual(expectedOrder);
  });
});
