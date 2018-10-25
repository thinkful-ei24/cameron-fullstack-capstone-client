import {FETCH_LEADERBOARD_SUCCESS, fetchLeaderboardSuccess} from './leaderboard-actions';

describe('fetchLeaderboardSuccess', () => {
  it('Should return the action', () => {
    const leaderboard = [{name: 'Bob', place: 2, score: 10}];
    const action = fetchLeaderboardSuccess(leaderboard);
    expect(action).toEqual({
      type: FETCH_LEADERBOARD_SUCCESS,
      leaderboard
    });  
  });
}); 