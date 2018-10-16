import {combineReducers} from 'redux';
import selectionReducer from './selection-reducer';
import authReducer from './auth-reducer';

export default combineReducers({
  selectionReducer,
  authReducer
});