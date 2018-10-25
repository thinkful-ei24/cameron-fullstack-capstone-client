import {
  FETCH_CONTESTANTS_REQUEST, fetchContestantsRequest, FETCH_CONTESTANTS_SUCCESS, fetchContestantsSuccess,
  FETCH_CONTESTANTS_ERROR, fetchContestantsError, ADD_SELECTION, addSelection,
  DELETE_SELECTION, deleteSelection, SUBMIT_GUESSES_SUCCESS, submitGuessesSuccess,
  SUBMIT_GUESSES_ERROR, submitGuessesError, GET_STATUS_SUCCESS, getStatusSuccess,
  CLEAR_ERROR, clearError
} from './selection-actions';

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
