import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

import WeekResults from './WeekResults';

import {fetchResults} from '../actions/results-actions';

export class ResultsHolder extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchResults());
  }
  errorDisplay(){
    if(this.props.error){
      return(
        <div className='errorDisplay'>{this.props.error.message}</div>
      )
    }
  }
  renderReact(){
    let results=[];
    for(let i=1; i<=10; i++){
      let week = `week${i}`;
      results.push(<WeekResults key={i} week={i} people={this.props.results[week]}/>);
    }
    return results;
  }
  render(){
    return(
      <div>
        {this.errorDisplay()}
        {this.renderReact()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    results: state.selectionReducer.results,
    error: state.selectionReducer.error
  })
}

export default requiresLogin()(connect(mapStateToProps)(ResultsHolder));