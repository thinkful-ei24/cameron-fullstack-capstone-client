import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../actions/signup-actions';
import {login} from '../actions/auth-actions';
import {Redirect} from 'react-router-dom';

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
    this.props.dispatch(signup(username, password))
    event.target['password'].value='';
    event.target['username'].value='';

  }
  customValidity(event){
    console.log(event.value);
    if (!event.value){
      event.setCustomValidity('Field is required');
    } else if (event.value.trim() !== event.value){
      event.setCustomValidity('Field cannot start or end with whitespace')
    } else if (event.id === 'password' && event.value.length<8){
      event.setCustomValidity('Password cannot be less than 8 characters')
    } else if (event.id === 'password' && event.value.length>72){
      event.setCustomValidity('Password cannot be more than 72 characters')
    } else if (event.id === 'username' && event.value.length<1){
      event.setCustomValidity('Username cannot be less than 2 characters')
    }else{
      event.setCustomValidity('');
    }
  }
  errorDisplay(){
    if(this.props.error){
      return(
        <div className='errorDisplay'>{this.props.error.message}</div>
      )
    }
  }
  render(){
    if(this.props.loggedIn){
      return <Redirect to='/selection' />;
    }
    return(
      <form className='signup-form' onSubmit={(e) => this.handleSubmit(e) }>
        {this.errorDisplay()}
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username'
          onChange={e => this.customValidity(e.target)} />
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' id='password'
          onChange={e => this.customValidity(e.target)}/>
        <button type='submit'>Login</button>
      </form>
    )
  }

}

const mapStateToProps = (state) =>{
  console.log(state.authReducer.currentUser);
  return ({
    error: state.authReducer.error,
    loggedIn: state.authReducer.currentUser !== null
  })
}

export default connect(mapStateToProps)(LoginForm);

