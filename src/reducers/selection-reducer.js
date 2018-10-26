import {FETCH_CONTESTANTS_REQUEST,
  FETCH_CONTESTANTS_SUCCESS,
  FETCH_CONTESTANTS_ERROR,
  ADD_SELECTION,
  DELETE_SELECTION,
  SUBMIT_GUESSES_SUCCESS,
  SUBMIT_GUESSES_ERROR,
  GET_STATUS_SUCCESS,
  CLEAR_ERROR, 
  CLEAR_GUESSES} from '../actions/selection-actions';

  import {addSelection, deleteChoice} from '../actions/choices';

import {FETCH_RESULTS_SUCCESS, FETCH_RESULTS_ERROR} from '../actions/results-actions';
import {FETCH_LEADERBOARD_SUCCESS} from '../actions/leaderboard-actions'; 

const initialState = {
  loading: false,
  selectionError: null,
  resultsError: null,
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
  week10: [], 
  status: null,
  results: {week1:{}, week2:{}, week3:{}, week4:{}, week5:{},
    week6:{}, week7:{}, week8:{}, week9:{}, week10:{}},
  scores: Array(10).fill(''),
  leaderboard: null,
  fullWeeks: []  
}; 

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_CONTESTANTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        selectionError: null,
        resultsError: null
      });
    case FETCH_CONTESTANTS_SUCCESS:
      return Object.assign({}, state,{
        loading: false,
        week0: action.contestants
      });
    case FETCH_CONTESTANTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        selectionError: action.error
      }); 
    case ADD_SELECTION:
      if(action.contestant){
        const i = action.week;
        const newObj = addSelection(state, action.contestant, i);
        return Object.assign({}, state, newObj);
      }
      return state;
    case DELETE_SELECTION:
      const newObj = deleteChoice(state, action.contestant, action.week);
      return Object.assign({}, state, newObj);
    case SUBMIT_GUESSES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        status: action.status,
        week1: [],
        week2: [],
        week3: [],
        week4: [],
        week5: [],
        week6: [],
        week7: [],
        week8: [],
        week9: [],
        week10: [],
        fullWeeks: []
      });
    case SUBMIT_GUESSES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        selectionError: action.error
      });
    case FETCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        results: action.data.feedback,
        status: action.data.status, 
        scores: action.data.scores,
        loading: false
      });
    case GET_STATUS_SUCCESS:
      return Object.assign({}, state, {
        status: action.status
      }); 
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        selectionError: null,
        resultsError: null
      });
    case FETCH_RESULTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        resultsError: action.error
      });
    case FETCH_LEADERBOARD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        leaderboard: action.leaderboard
      }); 
    case CLEAR_GUESSES:
      return Object.assign({}, state, initialState);             
    default:
      return state  
  }
}