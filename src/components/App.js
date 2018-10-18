import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import WeekHolder from './WeekHolder';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ResultsHolder from './ResultsHolder';
import SubmissionConfrim from './SubmissionConfirm';
import {refreshAuthToken} from '../actions/auth-actions';


export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={SignUpForm} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/selection' component={WeekHolder} />
        <Route exact path='/results' component={ResultsHolder} />
        <Route exact path='/submissionconfirmed' component={SubmissionConfrim} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.authReducer.authToken !== null,
  loggedIn: state.authReducer.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App));