import {authRequest, authError, login} from './auth-actions';
import { API_BASE_URL } from '../config';
import {signup} from './signup-actions';


describe('signup', () => {
  it('Should dispatch signup request and success on good request', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    const username = 'username';
    const password = 'password';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return {username};
        }
      })
    );
    const dispatch = jest.fn();
    return signup(username, password)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      expect(dispatch).toHaveBeenCalledWith(authRequest());
    })
  })
});