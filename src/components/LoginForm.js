import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth-actions';
import {Redirect, Link} from 'react-router-dom';

import './login-form.css';

export class LoginForm extends React.Component{
  componentDidMount(){
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    this.customValidity(username);
    this.customValidity(password);
  }

  handleSubmit(event){
    event.preventDefault();
    let password = event.target['password'].value;
    let username = event.target['username'].value;
    this.props.dispatch(login(username, password));
    event.target['password'].value='';
    event.target['username'].value='';

  }
  customValidity(event){
    if (!event.value){
      event.setCustomValidity('Field is required');
    } else if (event.value.trim() === ''){
      event.setCustomValidity('Field cannot be empty string')
    } else{
      event.setCustomValidity('');
    }
  }
  errorDisplay(){
    if(this.props.error){
      return(
        <div className='errorDisplay'  aria-live='assertive'>{this.props.error.message}</div>
      )
    }
  }
  render(){
    if(this.props.loggedIn){
      return <Redirect to='/selection' />;
    }
    return(
      <main role='main'>
        <form className='login-form' onSubmit={(e) => this.handleSubmit(e) }>
          {this.errorDisplay()}
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' id='username'
            onChange={e => this.customValidity(e.target)} />
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password'
            onChange={e => this.customValidity(e.target)}/>
          <button className='submit-user' type='submit'>Login</button>
        </form>
        <div>Don't have an account? <Link className='link' to='/signup'>Sign up now!</Link></div>

      </main>
    )
  }

}

const mapStateToProps = (state) =>{
  return ({
    error: state.authReducer.error,
    loggedIn: state.authReducer.currentUser !== null
  })
}

export default connect(mapStateToProps)(LoginForm);

