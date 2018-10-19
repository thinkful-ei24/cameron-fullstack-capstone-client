import React from 'react';
import {connect} from 'react-redux';

export class ResultsHeader extends React.Component{
  setScore(){
    const score = this.props.scores[this.props.week-1];
    if(score && score > 1){
      return <span>{score} points</span>;
    }else if(score === 1){
      return <span>{score} point</span>;
    }
  }
  render(){
    return (
      <div>
        <h2>Week {this.props.week}</h2>
        {this.setScore()}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  scores: state.selectionReducer.scores
});

export default connect(mapStateToProps)(ResultsHeader);