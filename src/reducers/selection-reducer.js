import {FETCH_CONTESTANTS_REQUEST,
  FETCH_CONTESTANTS_SUCCESS,
  FETCH_CONTESTANTS_ERROR} from '../actions/selection-actions';

const initialState = {
  loading: false,
  error: null,
  week0: []
}  

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_CONTESTANTS_REQUEST:
      return Object.assign({}, state, {loading: true});
    case FETCH_CONTESTANTS_SUCCESS:
      return Object.assign({}, state,{
        loading: false,
        week0: action.contestants
      });
    case FETCH_CONTESTANTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });    
    default:
      return state  
  }
}