import React from 'react';
import { connect } from 'react-redux';
import { addSelection } from '../actions/selection-actions';

import {filterChoices} from '../actions/choices';

import './contestant-drop-down.css';

export class ContestantList extends React.Component {

  renderReact() {
    return this.props.contestants.map((contestant, index) => (
      <option key={index}>{contestant}</option>
    ))
  }

  render() {
    return (
      <select aira-label='choose contesteants' onChange={e => this.props.dispatch(
        addSelection(e.target.value, this.props.week))}>
        <option value=''>Choose:</option>
        {this.renderReact()}
      </select>
    )
  }
}

const mapStateToProps = (state, props) => {
  const currentWeek = `week${props.week}`
  const filterWeek = `week${filterChoices(state.selectionReducer.fullWeeks, props.week)}`;
  if(filterChoices(state.selectionReducer.fullWeeks, props.week)){
    return ({
      contestants: state.selectionReducer[filterWeek]
        .filter(person => !state.selectionReducer[currentWeek].includes(person))
    });
  }
  return ({
    contestants: state.selectionReducer.week0
      .filter(person => !state.selectionReducer[currentWeek].includes(person))
  });
}


export default connect(mapStateToProps)(ContestantList);
