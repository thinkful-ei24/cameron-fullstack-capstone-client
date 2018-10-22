import React from 'react';
import './leader-result.css';

export default function LeaderResult(props){
  return (
    <div className={props.className}>
      <span className='place'>{props.person.place}</span>
      <h3>{props.person.username}</h3>
      <span className='leaderScore'>{props.person.score}</span>
    </div>
  )
};