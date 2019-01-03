import React from 'react';
import './leader-result.css';

export default function LeaderResult(props){
  return (
    <article className={props.className}>
      <span className='place'>{props.person.place}</span>
      <h2>{props.person.username}</h2>
      <span className='leaderScore'>{props.person.score}</span>
    </article>
  )
};