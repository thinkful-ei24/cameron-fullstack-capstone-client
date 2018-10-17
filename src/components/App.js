import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import WeekHolder from './WeekHolder';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


export class App extends React.Component{

  render(){
    return(
      <div className='app'>
        <Route exact path='/' component={SignUpForm} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/selection' component={WeekHolder} />
      </div>
    )
  }
}

export default withRouter(connect()(App));