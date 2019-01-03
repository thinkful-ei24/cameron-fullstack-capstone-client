import React from 'react';

import './week-result.css';
import SingleResult from './SingleResult';
import ResultsHeader from './ResultsHeader';

export default class WeekResults extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      expanded: false
    };
  }
  expandToggle(){
    this.setState({expanded: !this.state.expanded});
  };

  renderReact(){
    let results = [];
    for (let i=0; i<this.props.people.length; i++){
      results.push(<SingleResult key={i} person={this.props.people[i]}/>)
    }
    return results;
  }
  render(){
    if(this.state.expanded){
      return(
        <section className='week-results'>
          <ResultsHeader week={this.props.week} button='-' onClick={() => this.expandToggle()}/>
          <article className='results-container'>{this.renderReact()}</article>  
        </section>
      )
    }
    return (
      <section className='week-results' >
        <ResultsHeader week={this.props.week} button='+' onClick={() => this.expandToggle()}/>
      </section>
    )
  }
}