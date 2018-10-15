import {FETCH_CONTESTANTS_REQUEST,
  FETCH_CONTESTANTS_SUCCESS,
  FETCH_CONTESTANTS_ERROR,
  ADD_SELECTION,
  DELETE_SELECTION} from '../actions/selection-actions';

const initialState = {
  loading: false,
  error: null,
  week0: {choices:[],
    selection: []},
  week1: {choices: [],
    selection: []},
  week2: {choices: [],
    selection: []},
  week3: {choices: [],
    selection: []},
  week4: {choices: [],
    selection: []},
  week5: {choices: [],
    selection: []},
  week6: {choices: [],
    selection: []},
  week7: {choices: [],
    selection: []},
  week8: {choices: [],
    selection: []},
  week9: {choices: [],
    selection: []},
  week10: {choices: [],
    selection: []}
}  

const fixDelete = (state, week, contestant)=>{
  let newObj = {}
  for (let i=week; i<=10; i++){
    Object.assign(newObj, {
      [`week${i}`]: state[`week${1}`].filter(person => person!==contestant)
    });
  }
  return Object.assign(newObj, {[`week${week-1}`]: [...state[`week${week-1}`], contestant]});
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_CONTESTANTS_REQUEST:
      return Object.assign({}, state, {loading: true});
    case FETCH_CONTESTANTS_SUCCESS:
      const newWeek = Object.assign({}, state.week0, {choices: action.contestants})
      return Object.assign({}, state,{loading: false},{week0: newWeek});
    case FETCH_CONTESTANTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      }); 
    case ADD_SELECTION:
      if(action.contestant){
        const i = action.week;
        const oldWeek = `week${i-1}`;
        const newWeek = `week${i}`;
        const oldObj = Object.assign({}, state[oldWeek],{
          choices: state[oldWeek].choices.filter(person => person !== action.contestant),
        });
        const newObj = Object.assign({}, state[newWeek], 
          {choices: [...state[newWeek].choices, action.contestant],
            selection: [...state[newWeek].selection, action.contestant]}) 
        const newWeekObj = Object.assign({}, state[newWeek], newObj); 
        const oldWeekObj = Object.assign({}, state[oldWeek], oldObj)    
        return Object.assign({}, state, {[oldWeek]:oldWeekObj}, {[newWeek]: newWeekObj});
      }
      return state;
    case DELETE_SELECTION:
      const newObj = fixDelete(state, action.contestant, action.week);
      return Object.assign({}, state, newObj);
    default:
      return state  
  }
}