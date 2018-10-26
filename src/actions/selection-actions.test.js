import {
  FETCH_CONTESTANTS_REQUEST, fetchContestantsRequest, FETCH_CONTESTANTS_SUCCESS, fetchContestantsSuccess,
  FETCH_CONTESTANTS_ERROR, fetchContestantsError, ADD_SELECTION, addSelection,
  DELETE_SELECTION, deleteSelection, SUBMIT_GUESSES_SUCCESS, submitGuessesSuccess,
  SUBMIT_GUESSES_ERROR, submitGuessesError, GET_STATUS_SUCCESS, getStatusSuccess,
  CLEAR_ERROR, clearError, getContestants, getSelection, submitGuesses
} from './selection-actions';

import { API_BASE_URL } from '../config';

describe('fetchContestantsRequest', () => {
  it('Should return the action', () => {
    const action = fetchContestantsRequest();
    expect(action).toEqual({
      type: FETCH_CONTESTANTS_REQUEST
    });
  });
});

describe('fetchContestantsSuccess', () => {
  it('Should return the action', () => {
    const contestants = ['Bob', 'Joe'];
    const status = 'choosing';
    const action = fetchContestantsSuccess(contestants, status);
    expect(action).toEqual({
      type: FETCH_CONTESTANTS_SUCCESS,
      contestants,
      status
    });
  });
});

describe('fetchContestantsError', () => {
  it('Should return the action', () => {
    const error = { message: 'error' };
    const action = fetchContestantsError(error);
    expect(action).toEqual({
      type: FETCH_CONTESTANTS_ERROR,
      error
    });
  });
});

describe('addSelection', () => {
  it('Should return the action', () => {
    const contestant = 'Bob';
    const week = 1;
    const action = addSelection(contestant, week);
    expect(action).toEqual({
      type: ADD_SELECTION,
      contestant,
      week
    });
  });
});

describe('deleteSelection', () => {
  it('Should return the action', () => {
    const contestant = 'Bob';
    const week = 1;
    const action = deleteSelection(contestant, week);
    expect(action).toEqual({
      type: DELETE_SELECTION,
      contestant,
      week
    });
  });
});

describe('submitGuessesSuccess', () => {
  it('Should return the action', () => {
    const status = 'results';
    const action = submitGuessesSuccess(status);
    expect(action).toEqual({
      type: SUBMIT_GUESSES_SUCCESS,
      status
    });
  });
});

describe('submitGuessesError', () => {
  it('Should return the action', () => {
    const error = { message: 'error' };
    const action = submitGuessesError(error);
    expect(action).toEqual({
      type: SUBMIT_GUESSES_ERROR,
      error
    });
  });
});

describe('getStatusSuccess', () => {
  it('Should return the action', () => {
    const status = 'choosing';
    const action = getStatusSuccess(status);
    expect(action).toEqual({
      type: GET_STATUS_SUCCESS,
      status
    });
  });
});

describe('clearError', () => {
  it('Should return the action', () => {
    const action = clearError();
    expect(action).toEqual({
      type: CLEAR_ERROR
    });
  });
});

describe('getSelection', () => {
  it('Should dispatch getSelection request and success on good request', () => {
    const status = 'choosing';
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return { status };
        }
      })
    );
    const dispatch = jest.fn();
    return getSelection(jwt)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(fetchContestantsRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/status`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      expect(dispatch).toHaveBeenCalledWith(getStatusSuccess({status}));
    })
  })
});

describe('getContestants', () => {
  it('Should dispatch getContestants request and success on good request', () => {
    const results = ['bob', 'joe'];
    const status = 'choosing';
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return { results, status };
        }
      })
    );
    const dispatch = jest.fn();
    return getContestants(jwt)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(fetchContestantsRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/contestants`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      expect(dispatch).toHaveBeenCalledWith(fetchContestantsSuccess(results, status));
    })
  })
});

describe('submitGuesses', () => {
  it('Should dispatch submitGuesses request and success on good request', () => {
    const guesses = ['bob', 'joe'];
    const status = 'results';
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return { guesses, status };
        }
      })
    );
    const dispatch = jest.fn();
    return submitGuesses(jwt, guesses)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(fetchContestantsRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/guesses`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(guesses)
      });
      expect(dispatch).toHaveBeenCalledWith(submitGuessesSuccess(status));
    })
  })
});

