import {authRequest, authError, login} from './auth-actions';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const signup=(username, password) => dispatch => {
  dispatch(authRequest());
  return fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(() => dispatch(login(username, password)))
  .catch(err => {
    const {code} = err;
    err.message = 
      code === 422
        ? err.message
        : 'Unable to sign up. Please try again';
    dispatch(authError(err))    
  })  
}