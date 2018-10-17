import React from 'react';
import {connect} from 'react-redux';
import ContestantDropDown from './ContestantDropDown';
import Selections from './Selections';

export class WeekSelection extends React.Component{
  // remainingContestants = [21, 18, 15, 12, 9, 6, 4, 3, 2, 1];
  // renderReact(){
  //   if(this.props.weekLength < this.remainingContestants[this.props.week-1]){
  //     return (
  //       <ContestantDropDown week={this.props.week} />
  //     )
  //   }
  // }
  render(){
    return (
      <div>
        <h2>{`Week ${this.props.week}`}</h2>
        <ContestantDropDown week={this.props.week} />
        <Selections week={this.props.week} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  weekLength: state.selectionReducer[`week${props.week}`].length
});

export default connect(mapStateToProps)(WeekSelection);

