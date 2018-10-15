import {FETCH_CONTESTANTS_REQUEST,
  FETCH_CONTESTANTS_SUCCESS,
  FETCH_CONTESTANTS_ERROR,
  ADD_SELECTION} from '../actions/selection-actions';

const initialState = {
  loading: false,
  error: null,
  week0: [],
  week1: [],
  week2: [],
  week3: [],
  week4: [],
  week5: [],
  week6: [],
  week7: [],
  week8: [],
  week9: [],
  week10: []
}  

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_CONTESTANTS_REQUEST:
      return Object.assign({}, state, {loading: true});
    case FETCH_CONTESTANTS_SUCCESS:
      return Object.assign({}, state,{
        loading: false,
        week0 : action.contestants
      });
    case FETCH_CONTESTANTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      }); 
    case ADD_SELECTION:
      console.log(state[`week${action.week}`]);
    default:
      return state  
  }
}