import { FETCH_RESULTS_SUCCESS, fetchResultsSuccess, FETCH_RESULTS_ERROR, fetchResultsError, getResults, fetchResults } from './results-actions';
import { fetchContestantsRequest, getStatusSuccess} from './selection-actions';
import configureStore from 'redux-mock-store';
import {API_BASE_URL} from '../config';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('fetchResultsSuccess', () => {
  it('Should return the action', () => {
    const data = { data: 'data' };
    const action = fetchResultsSuccess(data);
    expect(action).toEqual({
      type: FETCH_RESULTS_SUCCESS,
      data
    });
  });
});

describe('fetchResultsError', () => {
  it('Should return the action', () => {
    const error = { message: 'error' };
    const action = fetchResultsError(error);
    expect(action).toEqual({
      type: FETCH_RESULTS_ERROR,
      error
    });
  });
}); 

describe('getResults', () => {
  it('Should dispatch getResults request and success on good request', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    const store = mockStore({authReducer: {authToken: jwt}});
    const status = 'results';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return {status};
        }
      })
    );
    return store.dispatch(getResults()).then(() => {
      const actions = store.getActions();
      console.log(actions);
      expect(actions).toContainEqual(fetchContestantsRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/status`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      expect(actions).toContainEqual(getStatusSuccess({status}));
    })
  })
});

describe('fetchResults', () => {
  it('Should dispatch fetchResults request and success on good request', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    const store = mockStore({authReducer: {authToken: jwt}});
    const data = {feedback: 'correct'};
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return {data};
        }
      })
    );
    return store.dispatch(fetchResults(jwt)).then(() => {
      const actions = store.getActions();
      console.log(actions);
      expect(actions).toContainEqual(fetchContestantsRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/results`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      expect(actions).toContainEqual(fetchResultsSuccess({data}));
    })
  })
});