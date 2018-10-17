import React from 'react';
import {connect} from 'react-redux';

import WeekHolder from './WeekHolder';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


export class App extends React.Component{

  render(){
    return(
      <SignUpForm />
    )
  }
}

export default connect()(App);