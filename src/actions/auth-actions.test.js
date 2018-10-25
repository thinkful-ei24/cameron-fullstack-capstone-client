import {
  SET_AUTH_TOKEN, setAuthToken, CLEAR_AUTH, clearAuth,
  AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess,
  GENERAL_SUCCESS, generalSuccess, AUTH_ERROR, authError,
  TOGGLE_INFO_DISPLAY, toggleInfoDisplay, CLEAR_ERROR, clearError,
  login, refreshAuthToken
} from './auth-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { API_BASE_URL } from '../config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('setAuthToken', () => {
  it('Should return the action', () => {
    const authToken = 'asfdljkadfl';
    const action = setAuthToken(authToken);
    expect(action).toEqual({
      type: SET_AUTH_TOKEN,
      authToken
    });
  });
});

describe('clearAuth', () => {
  it('Should return the action', () => {
    const action = clearAuth();
    expect(action).toEqual({
      type: CLEAR_AUTH
    });
  });
});

describe('authRequest', () => {
  it('Should return the action', () => {
    const action = authRequest();
    expect(action).toEqual({
      type: AUTH_REQUEST
    });
  });
});

describe('authSuccess', () => {
  it('Should return the action', () => {
    const currentUser = 'username';
    const action = authSuccess(currentUser);
    expect(action).toEqual({
      type: AUTH_SUCCESS,
      currentUser
    });
  });
});

describe('generalSuccess', () => {
  it('Should return the action', () => {
    const action = generalSuccess();
    expect(action).toEqual({
      type: GENERAL_SUCCESS
    });
  });
});

describe('authError', () => {
  it('Should return the action', () => {
    const error = { message: 'error' };
    const action = authError(error);
    expect(action).toEqual({
      type: AUTH_ERROR,
      error
    });
  });
});

describe('toggleInfoDisplay', () => {
  it('Should return the action', () => {
    const action = toggleInfoDisplay();
    expect(action).toEqual({
      type: TOGGLE_INFO_DISPLAY
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

describe('login', () => {
  it('Should dispatch login request and success on good request', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    const username = 'username';
    const password = 'password';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return {authToken: jwt};
        }
      })
    );
    const dispatch = jest.fn();
    return login(username, password)(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith(authRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      expect(dispatch).toHaveBeenCalledWith(setAuthToken(jwt));
    })
  })
});

describe('refreshAuthToken', () => {
  it('Should dispatch refreshAuthToken request and success on good request', () => {
    const oldJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2NDU5LCJleHAiOjE1NDExMDEyNTksInN1YiI6InVzZXJuYW1lIn0.gm_S1JMedhYtCf1RAg83_ojZ39ZtgX_trLQE7Os1Ar4';
    const newJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUifSwiaWF0IjoxNTQwNDk2ODQyLCJleHAiOjE1NDExMDE2NDIsInN1YiI6InVzZXJuYW1lIn0.o65Htxlo8Bn4Js_H9b1tqTH3S7Xb12M-w8kNtujooXE';

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return {authToken: newJwt};
        }
      })
    );
    const store = mockStore({authReducer: {authToken: oldJwt}});
    const dispatch = jest.fn();
    return store.dispatch(refreshAuthToken()).then(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(authRequest());
      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          // Provide our existing token as credentials to get a new one
          Authorization: `Bearer ${oldJwt}`
        }
      });
      expect(actions).toContainEqual(setAuthToken(newJwt));
    })
  })
});

