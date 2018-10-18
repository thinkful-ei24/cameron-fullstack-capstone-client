import React from 'react';
import requiresLogin from './requires-login';

export function SubmissionConfirm(props){
  return(
    <div>
      Thanks for submitting your guesses. Check back in soon to see results week by week.
    </div>
  )
}

export default requiresLogin()(SubmissionConfirm);