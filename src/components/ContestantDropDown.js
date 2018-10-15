import React from 'react';
import {connect} from 'react-redux';
import {addSelection} from '../actions/selection-actions';

export class ContestantList extends React.Component{

  renderReact(){
    return this.props.contestants.map((contestant, index) => (
      <option key={index}>{contestant}</option>
    ))
  }

  render(){
    return (
      <select onChange={e => this.props.dispatch(
        addSelection(e.target.value, this.props.week))}>
        <option value=''>Choose:</option>
        {this.renderReact()}
      </select>
    )
  }
}

const mapStateToProps = (state, props) => ({
    contestants: state.selectionReducer[`week${props.week-1}`]
      .filter(person => !state.selectionReducer[`week${props.week}`].includes(person))
});

export default connect(mapStateToProps)(ContestantList);
