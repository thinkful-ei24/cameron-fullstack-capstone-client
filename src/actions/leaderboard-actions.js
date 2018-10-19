import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

import {fetchContestantsRequest} from './selection-actions';
import {fetchResultsError} from './results-actions';

export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const fetchLeaderboardSuccess = leaderboard => ({
    type: FETCH_LEADERBOARD_SUCCESS,
    leaderboard
});

export const fetchLeaderboard = () => (dispatch, getState) => {
    const authToken = getState().authReducer.authToken;
    dispatch(fetchContestantsRequest());
    return fetch(`${API_BASE_URL}/api/results/leaderboard`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(fetchLeaderboardSuccess(res)))
        .catch(err => {
            dispatch(fetchResultsError(err));
        });
};