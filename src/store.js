import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {setAuthToken, refreshAuthToken} from './actions/auth-actions';
import { loadAuthToken } from './local-storage';

const store = createStore(rootReducer, applyMiddleware(thunk));

const authToken = loadAuthToken();
if(authToken){
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;


