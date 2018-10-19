import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth-actions';
import {clearAuthToken} from '../local-storage';

export class HeaderBar extends React.Component{

  logOut(){
    this.props.dispatch(clearAuth());
    clearAuthToken();
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
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);