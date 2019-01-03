import React from 'react';
import {connect} from 'react-redux';
import {deleteSelection} from '../actions/selection-actions';

import './single-selection.css';

export function SingleSelection(props){
  return (
    <article className='single-selection'>
      <button 
        className='delete-button' 
        onClick={() => props.dispatch(deleteSelection(props.contestant, props.week))}>
        <i className="fa fa-times-circle" aria-label='delete selection'></i>
      </button>
      <h3>{props.contestant}</h3>
    </article>
  )
}

export default connect()(SingleSelection)