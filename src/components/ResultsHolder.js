import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';

export function ResultsHolder(props){

}

export default requiresLogin()(connect()(ResultsHolder));