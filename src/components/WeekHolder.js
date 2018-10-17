import React from 'react';
import {connect} from 'react-redux';
import WeekSelection from './WeekSelection';
import {getContestants} from '../actions/selection-actions';

export class WeekHolder extends React.Component{
  componentDidMount(){
    this.props.dispatch(getContestants(this.props.jwt));
  }
  handleSubmit(e){
    e.preventDefault();
  }

  onKeyPress(e){
    if(e.which===13){
      e.preventDefault();
    }
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


  render(){
    return(
      <form className='selection-form'
       onSubmit={e => this.handleSubmit(e)}
       onKeyPress={e => this.onKeyPress(e)}>
        {this.renderReact()}
        <button type='submit' disabled={!this.conditionsMet()}>Submit</button>
      </form>
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
  week10: state.selectionReducer.week10
});

export default connect(mapStateToProps)(WeekHolder);