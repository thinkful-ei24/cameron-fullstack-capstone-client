import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import WeekSelection from './WeekSelection';
import {getContestants, submitGuesses} from '../actions/selection-actions';
import requiresLogin from './requires-login';

export class WeekHolder extends React.Component{
  componentDidMount(){
    this.props.dispatch(getContestants(this.props.jwt));
  }

  componentDidUpdate(prevProps){
    if(prevProps === 'choosing' && this.props.status === 'results'){
      return <Redirect to='/submissionconfirmed' />
    } else if(this.props.status === 'results'){
      return <Redirect to='/results' />
    }
  }
  handleSubmit(e){
    const guesses = {
      week1: this.props.week1,
      week2: this.props.week2,
      week3: this.props.week3,
      week4: this.props.week4,
      week5: this.props.week5,
      week6: this.props.week6,
      week7: this.props.week7,
      week8: this.props.week8,
      week9: this.props.week9,
      week10: this.props.week10,
    }
    this.props.dispatch(submitGuesses(this.props.jwt, guesses));
  }

  remainingContestants = [21, 18, 15, 12, 9, 6, 4, 3, 2, 1];
  conditionsMet(){
    for(let i=1; i<=10; i++){
      if(this.props[`week${i}`].length !== this.remainingContestants[i-1]){
        return false
      }
    }
    return true;
  }
  renderReact(){
    let weeks=[];
    for(let i=1; i<=10; i++){
      weeks.push(<WeekSelection key={i} id={`week${i}`} week={i} />)
    }
    return weeks;
  }
  errorDisplay(){
    if(this.props.error){
      return(
        <div className='errorDisplay'>{this.props.error.message}</div>
      )
    }
  }


  render(){
    return(
      <div>
        {this.errorDisplay()}
        {this.renderReact()}
        <button disabled={!this.conditionsMet()} onClick={(e) => this.handleSubmit(e)}>Submit</button>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  jwt: state.authReducer.authToken,
  week1: state.selectionReducer.week1,
  week2: state.selectionReducer.week2,
  week3: state.selectionReducer.week3,
  week4: state.selectionReducer.week4,
  week5: state.selectionReducer.week5,
  week6: state.selectionReducer.week6,
  week7: state.selectionReducer.week7,
  week8: state.selectionReducer.week8,
  week9: state.selectionReducer.week9,
  week10: state.selectionReducer.week10,
  error: state.selectionReducer.error
});

export default requiresLogin()(connect(mapStateToProps)(WeekHolder));