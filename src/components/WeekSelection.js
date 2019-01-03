import React from 'react';
import {connect} from 'react-redux';
import ContestantDropDown from './ContestantDropDown';
import Selections from './Selections';

import './week-selection.css';

export class WeekSelection extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      expanded: false
    };
  }

  expandToggle(){
    this.setState({expanded: !this.state.expanded});
  }

  remainingContestants = [21, 18, 15, 12, 9, 6, 4, 3, 2, 1];
  renderReact(){
    if(this.props.weekLength < this.remainingContestants[this.props.week-1]){
      return (
        <ContestantDropDown week={this.props.week} />
      )
    }
  }
  fullWeeks(){
    if(this.props.weekLength === this.remainingContestants[this.props.week-1]){
      return (
        'full-week'
      )
    }
  }
  render(){
    if(this.state.expanded){
      return (
        <section className={`week-selection-container ${this.fullWeeks()}`}>
          <header className='week-header'>
            <h2>{`Week ${this.props.week}`}</h2>
            <button className='expand-collapse-button' onClick={() => this.expandToggle()}>
              <i className="fa fa-minus" aria-label='collapse week'></i>
            </button>
          </header>
          <article className='selection-container'>
            {this.renderReact()}
            <Selections week={this.props.week} />
          </article>
        </section>
      )
    }
    return (
      <div className={`week-header week-selection-container ${this.fullWeeks()}`}>
      <h2>{`Week ${this.props.week}`}</h2>
      <button className='expand-collapse-button' onClick={() => this.expandToggle()}>
        <i className='fa fa-plus' aria-label='expand week results'></i>
      </button>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  weekLength: state.selectionReducer[`week${props.week}`].length
});

export default connect(mapStateToProps)(WeekSelection);

