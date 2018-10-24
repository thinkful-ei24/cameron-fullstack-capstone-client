import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth-actions';
import {Redirect, Link} from 'react-router-dom';

import {clearError} from '../actions/auth-actions';

import './login-form.css';

export class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.username=React.createRef();
    this.password=React.createRef();
  }
  componentDidMount(){
    // const username = document.getElementById('username');
    // const password = document.getElementById('password);
    this.customValidity(this.username);
    this.customValidity(this.password);
    this.props.dispatch(clearError());
  }

  handleSubmit(event){
    event.preventDefault();
    let password = this.password.current.value;
    let username = this.username.current.value;
    this.props.dispatch(login(username, password));
    this.password.current.value='';
    this.username.current.value='';

  }
  customValidity(event){
    if (!event.current.value){
      event.current.setCustomValidity('Field is required');
    } else if (event.current.value.trim() === ''){
      event.current.setCustomValidity('Field cannot be empty string')
    } else{
      event.current.setCustomValidity('');
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
          <input type='text' name='username' id='username' ref={this.username}
            onChange={e => this.customValidity(this.username)} />
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' ref={this.password}
            onChange={e => this.customValidity(this.password)}/>
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

