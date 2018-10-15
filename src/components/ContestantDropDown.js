import React from 'react';
import {connect} from 'react-redux';
import{getContestants} from '../actions/selection-actions';

export class ContestantList extends React.Component{
  componentDidMount(){
    this.props.dispatch(getContestants());
  }

  renderReact(){
    return this.props.contestants.map((contestant, index) => (
      <option key={index}>{contestant}</option>
    ))
  }

  render(){
    return (
      <select>
        <option value=''>Choose:</option>
        {this.renderReact()}
      </select>
    )
  }
}

const mapStateToProps = (state, props) => ({
    contestants: state.selectionReducer[`week${props.week}`]
});

export default connect(mapStateToProps)(ContestantList);
