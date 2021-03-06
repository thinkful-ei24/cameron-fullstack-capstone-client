import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {Redirect, Link} from 'react-router-dom';

import WeekResults from './WeekResults';

import {getResults} from '../actions/results-actions';

export class ResultsHolder extends React.Component{
  componentWillMount(){
    this.props.dispatch(getResults());
  }

  errorDisplay(){
    if(this.props.error){
      return(
        <section className='errorDisplay' aria-live='assertive'>{this.props.error.message}</section>
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
    if(this.props.loading){
      return <div>Loading...</div>
    }
    return(
      <main role='main'>
        <Link className='link' to='/results/leaderboard'>See the leaderboard!</Link>
        {this.errorDisplay()}
        {this.renderReact()}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    results: state.selectionReducer.results,
    error: state.selectionReducer.resultsError,
    status: state.selectionReducer.status,
    loading: state.selectionReducer.loading
  })
}

export default requiresLogin()(connect(mapStateToProps)(ResultsHolder));