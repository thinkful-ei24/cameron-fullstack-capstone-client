import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';

import WeekResults from './WeekResults';

import {fetchResults} from '../actions/results-actions';
import {getStatus} from '../actions/selection-actions';

export class ResultsHolder extends React.Component{
  componentWillMount(){
    this.props.dispatch(getStatus(this.props.jwt));
  }
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
    if(this.props.status === 'choosing'){
      return <Redirect to='/selection'/>
    }
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
    error: state.selectionReducer.resultsError,
    status: state.selectionReducer.status,
    jwt: state.authReducer.authToken
  })
}

export default requiresLogin()(connect(mapStateToProps)(ResultsHolder));