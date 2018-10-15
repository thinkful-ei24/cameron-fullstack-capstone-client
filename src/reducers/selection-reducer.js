import {FETCH_CONTESTANTS_REQUEST,
  FETCH_CONTESTANTS_SUCCESS,
  FETCH_CONTESTANTS_ERROR,
  ADD_SELECTION,
  DELETE_SELECTION} from '../actions/selection-actions';

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
      if(action.contestant){
        const i = action.week;
        const oldWeek = `week${i-1}`;
        const newWeek = `week${i}`;
        const newArr = {
          [oldWeek]: state[oldWeek].filter(person => person !== action.contestant),
          [newWeek]: [...state[newWeek], action.contestant]
        }
        return Object.assign({}, state, newArr);
      }
      return state;
    case DELETE_SELECTION:
      const newObj = fixDelete(state, action.contestant, action.week);
      return Object.assign({}, state, newObj);
    default:
      return state  
  }
}