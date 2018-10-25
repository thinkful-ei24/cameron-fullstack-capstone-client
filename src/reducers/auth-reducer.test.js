import authReducer from './auth-reducer';
import {
  setAuthToken, clearAuth, authSuccess, authRequest, authError,
  toggleInfoDisplay, clearError
} from '../actions/auth-actions';

describe('authReducer', () => {
  const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null,
    infoDisplay: false 
  }
  it('Should set the initial state when nothing is passed in', () => {
    const state = authReducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const currentState = {};
    const state = authReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toEqual(currentState);
  });
  
  describe('setAuthToken', () => {
    it('Should set authToken', () => {
      const authToken = 'asfjladsfkjowenafd';
      const state = authReducer(initialState, setAuthToken(authToken));
      expect(state).toEqual({
        authToken,
        currentUser: null,
        loading: false,
        error: null,
        infoDisplay: false 
      });
    });
  });

  describe('clearAuth', () => {
    it('Should clear authToken and currentUser', () => {
      let state = {
        authToken: 'asdhkasdfhkd',
        currentUser: 'asdklj',
        loading: false,
        error: null,
        infoDisplay: false 
      }
      state = authReducer(state, clearAuth());
      expect(state).toEqual(initialState);
    });
  });

  describe('authRequest', () => {
    it('Should set loading and clear error and status', () => {
      let state = {
        loading: false,
        error: 'error'
      }
      state = authReducer(state, authRequest());
      expect(state).toEqual({
        loading: true,
        error: null
      });
    });
  });

  describe('authSuccess', () => {
    it('Should set auth', () => {
      const currentUser = 'username';
      let state = {
        loading: true
      }
      state = authReducer(state, authSuccess(currentUser));
      expect(state).toEqual({
        loading: false,
        currentUser
      });
    });
  });

  describe('authError', () => {
    it('Should set error', () => {
      const error = 'error';
      let state = {
        loading: true
      }
      state = authReducer(state, authError(error));
      expect(state).toEqual({
        loading: false,
        error
      });
    });
  });

  describe('toggleInfoDisplay', () => {
    it('Should set auth', () => {
      const infoDisplay = true;
      let state = {
        infoDisplay
      }
      state = authReducer(state, toggleInfoDisplay());
      expect(state).toEqual({
        infoDisplay: !infoDisplay
      });
    });
  });

  describe('clearError', () => {
    it('Should set auth', () => {
      const error = 'error';
      let state = {
        error
      }
      state = authReducer(state, clearError());
      expect(state).toEqual({
        error: null
      });
    });
  });

});