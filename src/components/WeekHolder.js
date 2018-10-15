import React from 'react';
import {connect} from 'react-redux';
import WeekSelection from './WeekSelection';
import {getContestants} from '../actions/selection-actions';

export class WeekHolder extends React.Component{
  componentDidMount(){
    this.props.dispatch(getContestants());
  }
  renderReact(){
    let weeks=[];
    for(let i=1; i<=10; i++){
      weeks.push(<WeekSelection key={i} week={i} />)
    }
    return weeks;
  }

  render(){
    return(
      <div>
        {this.renderReact()}
      </div>
    )
  }
}

export default connect()(WeekHolder);