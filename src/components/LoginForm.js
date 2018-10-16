import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth-actions';

export class LoginForm extends React.Component{
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

    return(
      <form id='loginForm' onSubmit={(e) => this.handleSubmit(e) }>
        {this.errorDisplay()}
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

const mapStateToProps = (state) =>({
  error: state.authReducer.error
})

export default connect(mapStateToProps)(LoginForm);

