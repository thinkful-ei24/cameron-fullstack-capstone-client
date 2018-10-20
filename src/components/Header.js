import React from 'react';
import {connect} from 'react-redux';
import {clearAuth, toggleInfoDisplay} from '../actions/auth-actions';
import {clearAuthToken} from '../local-storage';

export class HeaderBar extends React.Component{

  logOut(){
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  infoButton(){
    if(this.props.infoDisplay){
      return "Got it!";
    }
    return '?';
  }

  render(){
    let logOutButton;
    if(this.props.loggedIn){
      logOutButton = (
        <button onClick={() => this.logOut()}>Logout</button>
      )
    }
    return(
      <nav>
        <h1>The Bachelorette Fantasy League</h1>
        {logOutButton}
        <button onClick={() => this.props.dispatch(toggleInfoDisplay())}>{this.infoButton()}</button>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.currentUser !== null,
  infoDisplay: state.authReducer.infoDisplay
});

export default connect(mapStateToProps)(HeaderBar);