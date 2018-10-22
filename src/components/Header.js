import React from 'react';
import { connect } from 'react-redux';
import { clearAuth, toggleInfoDisplay } from '../actions/auth-actions';
import { clearAuthToken } from '../local-storage';


import './header.css';

export class HeaderBar extends React.Component {

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }
  infoButton() {
    if (this.props.infoDisplay) {
      return (
        <button
        className='close-button'
        aria-label='Close info'
        onClick={() => this.props.dispatch(toggleInfoDisplay())}>
        X
      </button>
      );
    }
    return (
      <button
        className='info-button'
        aria-label='More info'
        onClick={() => this.props.dispatch(toggleInfoDisplay())}>
          <i className="far fa-question-circle"></i>
      </button>
    );
  }

  render() {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button 
        className='logout'
        aria-label='Log out' 
        onClick={() => this.logOut()}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      )
    }
    return (
      <nav role='navigation' className='nav-bar'>
        <h1> The Bachelorette Fantasy League</h1>
        <div>
        {this.infoButton()}
        {logOutButton}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.authReducer.currentUser !== null,
  infoDisplay: state.authReducer.infoDisplay
});

export default connect(mapStateToProps)(HeaderBar);