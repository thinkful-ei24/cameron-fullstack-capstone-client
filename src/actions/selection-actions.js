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

export const getContestants = () => (dispatch) => {
  dispatch(fetchContestantsRequest());
  fetch(`${API_BASE_URL}/contestants`)
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(fetchContestantsSuccess(res)))
  .catch(err => dispatch(fetchContestantsError(err)));
}