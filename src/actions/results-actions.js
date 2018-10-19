import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

import { fetchContestantsRequest} from './selection-actions';

export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const fetchResultsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data
});

export const FETCH_RESULTS_ERROR = 'FETCH_RESULTS_ERROR';
export const fetchResultsError = (error) => {
  return ({
    type: FETCH_RESULTS_ERROR,
    error
  })
}


export const fetchResults = () => (dispatch, getState) => {
  const authToken = getState().authReducer.authToken;
  dispatch(fetchContestantsRequest());
  fetch(`${API_BASE_URL}/api/results`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(fetchResultsSuccess(data)))
    .catch(err => dispatch(fetchResultsError(err)));
};