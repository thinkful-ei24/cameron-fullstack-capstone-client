import {SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_ERROR} from '../actions/auth-actions';

const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null  
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_AUTH_TOKEN:
      return Object.assign({}, state, {authToken: action.authToken});
    case CLEAR_AUTH: 
      return Object.assign({}, state, {
        authToken: null,
        currentUser: null
      }); 
    case AUTH_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        status: null
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.currentUser, 
        status: action.status
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
      loading: false,
      error: action.error
      });
    default:
      return state;  
  }
};