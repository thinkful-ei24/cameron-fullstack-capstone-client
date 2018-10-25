import { FETCH_RESULTS_SUCCESS, fetchResultsSuccess, FETCH_RESULTS_ERROR, fetchResultsError } from './results-actions';

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