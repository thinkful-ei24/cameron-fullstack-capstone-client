import React from 'react';
import {connect} from 'react-redux';
import SingleSelection from './SingleSeleciton';
import './selection.css';

export class Selections extends React.Component{
  renderReact(){
    let selectionArr = this.props.contestants.map((contestant, index) => (
        <SingleSelection key={index} contestant={contestant} week={this.props.week}/>
      )
    )
    return selectionArr;
  }
  render(){
    return(
      <div className='selection'>
        {this.renderReact()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  contestants: state.selectionReducer[`week${props.week}`]
})

export default connect(mapStateToProps)(Selections);