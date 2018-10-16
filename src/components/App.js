import React from 'react';
import {connect} from 'react-redux';

import WeekHolder from './WeekHolder';
import Form from './Form';

import {login} from '../actions/auth-actions';


export class App extends React.Component{

  render(){
    return(
      <Form />
    )
  }
}

export default connect()(App);