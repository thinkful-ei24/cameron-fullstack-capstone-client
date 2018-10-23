import React from 'react';
import {connect} from 'react-redux';

import './results-header.css';

export class ResultsHeader extends React.Component{
  setScore(){
    const score = this.props.scores[this.props.week-1];
    if((score && score > 1) || score === 0){
      return <span>{score} points</span>;
    }else if(score === 1){
      return <span>{score} point</span>;
    }
  }

  render(){
      let buttonContent;
      if (this.props.button === '+'){
        buttonContent = <i className='fa fa-plus' aria-label='expand week results'></i>;
      } else{
        buttonContent = <i className="fa fa-minus" aria-label='collapse week'></i>;
      }
    return (
      <div className='results-header'>
        <h2>Week {this.props.week}</h2>
        {this.setScore()}
        <button className='expand-collapse-button'onClick={() => this.props.onClick()}>{buttonContent}</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  scores: state.selectionReducer.scores
});

export default connect(mapStateToProps)(ResultsHeader);