import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

export class ResultsHolder extends React.Component{
  componentDidMount(){

  }

  render(){
    return(
      <div>Working</div>
    );
  }
}

export default requiresLogin()(connect()(ResultsHolder));