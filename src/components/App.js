import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import './app.css';

import WeekHolder from './WeekHolder';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ResultsHolder from './ResultsHolder';
import Header from './Header';
import LandingPage from './LandingPage';
import SubmissionConfrim from './SubmissionConfirm';
import {refreshAuthToken} from '../actions/auth-actions';
import Leaderboard from './Leaderboard';
import Info from './Info';


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
    if(this.props.infoDisplay){
      return (
        <div className='app'>
          <Header />
          <Info />
        </div>
      )
    }
    return (
      <div className='app'>
        <Header />
        <Route exact path='/signup' component={SignUpForm} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/selection' component={WeekHolder} />
        <Route exact path='/results' component={ResultsHolder} />
        <Route exact path='/submissionconfirmed' component={SubmissionConfrim} />
        <Route exact path='/results/leaderboard' component={Leaderboard} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.authReducer.authToken !== null,
  loggedIn: state.authReducer.currentUser !== null,
  infoDisplay: state.authReducer.infoDisplay
})

export default withRouter(connect(mapStateToProps)(App));