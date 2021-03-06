import React from 'react';
import './info.css';

export default function Info(props){
  return (
    <main role='main' className='info'>
      <h2>Do you think you know who Becca will end up with?</h2>
      <h3>Now you can make your selections and see how your guesses stack up to Becca's real-life choices.</h3>
      <h4>Here's how it works:</h4>
      <ul className='instructions'>
        <li>Sign up for a free account</li>
        <li>Log in to make your selections. Choose who you think will make the cut each week.</li>
        <li>You can start making your selections from any week. Anyone added in later weeks will automatically be added
          to the previous weeks. When a week is full, the border will turn green and the dropdown box will disappear.
        </li>
        <li>Check back when the show starts to see your results. Each week, results will be updated.</li>
        <li>Don't forget to check the leaderboard to see how you stack up to other Bachelor fans!</li>
      </ul>
      
    </main>
  )
}