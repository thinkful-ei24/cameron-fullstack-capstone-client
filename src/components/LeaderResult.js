import React from 'react';

export default function LeaderResult(props){
  return (
    <div>
      <span className='place'>{props.person.place}</span>
      <h3>{props.person.username}</h3>
      <span className='leaderScore'>{props.person.score}</span>
    </div>
  )
};