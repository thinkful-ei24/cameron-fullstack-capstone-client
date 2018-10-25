import {
  SET_AUTH_TOKEN, setAuthToken, CLEAR_AUTH, clearAuth,
  AUTH_REQUEST, authRequest, AUTH_SUCCESS, authSuccess,
  GENERAL_SUCCESS, generalSuccess, AUTH_ERROR, authError,
  TOGGLE_INFO_DISPLAY, toggleInfoDisplay, CLEAR_ERROR, clearError
} from './auth-actions';

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