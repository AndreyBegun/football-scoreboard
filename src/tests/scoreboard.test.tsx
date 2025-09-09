
import { renderHook, act } from '@testing-library/react';
import { useScoreboard } from './useScoreboard';

describe('useScoreboard', () => {
  it('should start a new match with a score of 0-0', () => {
    
    const { result } = renderHook(() => useScoreboard());
    
    act(() => {
      result.current.startNewMatch('Mexico', 'Canada');
    });

    expect(result.current.summary.length).toBe(1);
    expect(result.current.summary[0]).toMatchObject({
      homeTeam: 'Mexico',
      awayTeam: 'Canada',
      homeScore: 0,
      awayScore: 0,
    });
  });
});