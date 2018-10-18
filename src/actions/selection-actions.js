import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';


export const FETCH_CONTESTANTS_REQUEST = 'FETCH_CONTESTANTS_REQUEST';
export const fetchContestantsRequest = () => {
  return ({
    type: FETCH_CONTESTANTS_REQUEST
  });
};

export const FETCH_CONTESTANTS_SUCCESS = 'FETCH_CONTESTANTS_SUCCESS';
export const fetchContestantsSuccess = (contestants) => {
  return ({
    type: FETCH_CONTESTANTS_SUCCESS,
    contestants
  })
}

export const FETCH_CONTESTANTS_ERROR = 'FETCH_CONTESTANTS_ERROR';
export const fetchContestantsError = (error) => {
  return ({
    type: FETCH_CONTESTANTS_SUCCESS,
    error
  })
}

export const ADD_SELECTION = 'ADD_SELECTION';
export const addSelection = (contestant, week) => {
  return ({
    type: ADD_SELECTION,
    contestant,
    week
  })
}

export const DELETE_SELECTION = 'DELETE_SELECTION';
export const deleteSelection = (contestant, week) => {
  return ({
    type: DELETE_SELECTION,
    contestant,
    week
  })
}

export const SUBMIT_GUESSES_SUCCESS_STATUS = 'SUBMIT_GUESSES_SUCCESS_STATUS';
export const submitGuessesSuccessStatus = (status) => {
  return ({
    type: SUBMIT_GUESSES_SUCCESS_STATUS,
    status
  });
}

export const SUBMIT_GUESSES_SUCCESS = 'SUBMIT_GUESSES_SUCCESS';
export const submitGuessesSuccess = () => {
  return ({
    type: SUBMIT_GUESSES_SUCCESS
  });
}

export const SUBMIT_GUESSES_ERROR = 'SUBMIT_GUESSES_ERROR';
export const submitGuessesError = (error) => {
  return ({
    type: SUBMIT_GUESSES_ERROR,
    error
  });
}

export const getContestants = (jwt) => (dispatch) => {
  dispatch(fetchContestantsRequest());
  fetch(`${API_BASE_URL}/api/contestants`, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(fetchContestantsSuccess(res)))
  .catch(err => dispatch(fetchContestantsError(err)));
}

export const submitGuesses = (jwt, guesses) => (dispatch, getState) => {
  dispatch(fetchContestantsRequest());
  fetch(`${API_BASE_URL}/api/guesses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(guesses)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(submitGuessesSuccess('results')))
  .catch(err => dispatch(submitGuessesError(err)));
}