import React from 'react';
import {connect} from 'react-redux';
import {deleteSelection} from '../actions/selection-actions';

export function SingleSelection(props){
  return (
    <div>
      <button onClick={() => props.dispatch(deleteSelection(props.contestant, props.week))}>Delete</button>
      <h3>{props.contestant}</h3>
    </div>
  )
}

export default connect()(SingleSelection)