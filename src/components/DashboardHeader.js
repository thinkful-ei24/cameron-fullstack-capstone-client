import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth-actions';

export function DashboardHeader(props){
  return(
    <nav>
      <h1>The Bachelorette Fantasy League</h1>
      <button onClick={() => props.dispatch(clearAuth())}>Logout</button>
    </nav>
  )
}

export default connect()(DashboardHeader);