import React from 'react';
import {connect} from 'react-redux';
import SingleSelection from './SingleSeleciton';

export class Selections extends React.Component{
  remainingContestants = [21, 18, 15, 12, 9, 6, 4, 3, 2, 1];
  renderReact(){
    let selectionArr = this.props.contestants.map((contestant, index) => (
        <SingleSelection key={index} contestant={contestant} week={this.props.week}/>
      )
    )
    return selectionArr;
  }
  render(){
    return(
      <div>
        {this.renderReact()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  contestants: state.selectionReducer[`week${props.week}`]
})

export default connect(mapStateToProps)(Selections);