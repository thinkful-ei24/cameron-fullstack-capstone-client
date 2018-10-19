import {FETCH_CONTESTANTS_REQUEST,
  FETCH_CONTESTANTS_SUCCESS,
  FETCH_CONTESTANTS_ERROR,
  ADD_SELECTION,
  DELETE_SELECTION,
  SUBMIT_GUESSES_SUCCESS,
  SUBMIT_GUESSES_ERROR,
  GET_STATUS_SUCCESS,
  CLEAR_ERROR} from '../actions/selection-actions';

import {FETCH_RESULTS_SUCCESS, FETCH_RESULTS_ERROR} from '../actions/results-actions'; 

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
    week6:{}, week7:{}, week8:{}, week9:{}, week10:{}}
}; 

const fixDelete = (state, contestant, week)=>{
  let newObj = {}
  for (let i=week; i<=10; i++){
    let weekName = `week${i}`
    newObj[weekName] = state[`week${i}`].filter(person => person!==contestant);
  }
  return newObj;
}  

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
        const newWeek = `week${i}`;
        return Object.assign({}, state, {
          [newWeek]: [...state[newWeek], action.contestant]
        });
      }
      return state;
    case DELETE_SELECTION:
      const newObj = fixDelete(state, action.contestant, action.week);
      return Object.assign({}, state, newObj);
    case SUBMIT_GUESSES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        status: action.status
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
        loading: false
      });
    case GET_STATUS_SUCCESS:
      return Object.assign({}, state, {
        status: action.status, 
        loading: false
      }); 
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        selectionError: null,
        resultsError: null
      });
    case FETCH_RESULTS_ERROR:
      return Object.assign({}, state, {
        resultsError: action.error
      });          
    default:
      return state  
  }
}