import React from 'react';

import SingleResult from './SingleResult';

export default function WeekResults(props){
  let results = [];
  for (let i=0; i<props.people.length; i++){
    results.push(<SingleResult key={i} person={props.people[i]}/>)  
  }
  return(
    <div>
      <h2>{`Week ${props.week}`}</h2>
      {results}  
    </div>
  )
}