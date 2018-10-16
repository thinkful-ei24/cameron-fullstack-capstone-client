import React from 'react';
import {connect} from 'react-redux';

export class LoginForm extends React.Component{
  handleSubmit(event){
    event.preventDefault();
    const passwordInput = event.target['password'];
    const usernameInput = event.target['username'];
    
  }
  customValidity(event){
    if (!event.value){
      event.setCustomValidity('Field is required');
    } else if (event.value.trim() === ''){
      event.setCustomValidity('Field cannot be empty string')
    }
  }
  render(){
    return(
      <form id='loginForm' onSubmit={(e) => this.handleSubmit(e) }>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' 
          onChange={e => this.customValidity(e.target)}/>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' id='password'
           onChange={e => this.customValidity(e.target)}/>
        <button type='submit'>Login</button>
      </form>
    )
  }

}

export default connect()(LoginForm);

