import React from 'react';
import {connect} from 'react-redux';

import WeekHolder from './WeekHolder';
import Form from './Form';

import {login} from '../actions/auth-actions';


export class App extends React.Component{
  handleLogin(event){
    event.preventDefault();
    let password = event.target['password'].value;
    let username = event.target['username'].value;
    this.props.dispatch(login(username, password));
    event.target['password'].value='';
    event.target['username'].value='';
  }
  customValidityLogin(event){
    if (!event.value){
      event.setCustomValidity('Field is required');
    } else if (event.value.trim() === ''){
      event.setCustomValidity('Field cannot be empty string')
    }
  }
  render(){
    return(
      <Form handleSubmit={e => this.handleLogin(e)}
        customValidity={e => this.customValidityLogin(e)}/>
    )
  }
}

export default connect()(App);