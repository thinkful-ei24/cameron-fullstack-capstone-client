import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/signup-actions';
import { Redirect, Link } from 'react-router-dom';

import {clearError} from '../actions/auth-actions';

import './signup-form.css';

export class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.username=React.createRef();
    this.password=React.createRef();
  }

  componentDidMount() {
    this.customValidity(this.username);
    this.customValidity(this.password);
    this.props.dispatch(clearError());
  }

  handleSubmit(event) {
    event.preventDefault();
    let password = this.password.current.value;
    let username = this.username.current.value;
    this.props.dispatch(signup(username, password))
    this.password.current.value = '';
    this.username.current.value = '';

  }
  customValidity(event) {
    if (!event.current.value) {
      event.current.setCustomValidity('Field is required');
    } else if (event.current.value.trim() !== event.current.value) {
      event.current.setCustomValidity('Field cannot start or end with whitespace')
    } else if (event.current.id === 'password' && event.current.value.length < 8) {
      event.current.setCustomValidity('Password cannot be less than 8 characters')
    } else if (event.current.id === 'password' && event.current.value.length > 72) {
      event.current.setCustomValidity('Password cannot be more than 72 characters')
    } else if (event.current.id === 'username' && event.current.value.length < 1) {
      event.current.setCustomValidity('Username cannot be less than 2 characters')
    } else {
      event.current.setCustomValidity('');
    }
  }
  errorDisplay() {
    if (this.props.error) {
      return (
        <div className='errorDisplay'  aria-live='assertive'>{this.props.error.message}</div>
      )
    }
  }
  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/selection' />;
    }
    return (
        <form className='signup-form' onSubmit={(e) => this.handleSubmit(e)}>
          {this.errorDisplay()}
          <label htmlFor='username'>Username:</label>
          <input type='text' name='username' id='username' ref={this.username}
            onChange={e => this.customValidity(this.username)} />
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' ref={this.password}
            onChange={e => this.customValidity(this.password)} />
          <button className='submit-user' type='submit'>Sign Up</button>
        </form>
    )
  }

}

const mapStateToProps = (state) => {
  return ({
    error: state.authReducer.error,
    loggedIn: state.authReducer.currentUser !== null
  })
}

export default connect(mapStateToProps)(SignUpForm);

