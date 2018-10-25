import {FETCH_LEADERBOARD_SUCCESS, fetchLeaderboardSuccess, fetchLeaderboard} from './leaderboard-actions';
import configureStore from 'redux-mock-store';
import { fetchContestantsRequest } from './selection-actions';
import {API_BASE_URL} from '../config';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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

describe('fetchLeaderboard', () => {
  it('Should dispatch fetchLeaderboard request and success on good request', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    const store = mockStore({authReducer: {authToken: jwt}});
    
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return {data: [{name: 'username'}]};
        }
      })
    );
    const dispatch = jest.fn();
    return store.dispatch(fetchLeaderboard()).then(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(fetchContestantsRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/results/leaderboard`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${jwt}`
        }
    });
      expect(actions).toContainEqual(fetchLeaderboardSuccess({data: [{name: 'username'}]}));
    })
  })
});