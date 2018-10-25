import {SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_ERROR,
  TOGGLE_INFO_DISPLAY,
  CLEAR_ERROR} from '../actions/auth-actions';

const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null,
  infoDisplay: false 
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
        error: null
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        currentUser: action.currentUser
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
      loading: false,
      error: action.error
      });
    case TOGGLE_INFO_DISPLAY:
      return Object.assign({}, state, {
        infoDisplay: !state.infoDisplay
      });
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        error: null
      });
    default:
      return state;  
  }
};