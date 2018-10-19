import React from 'react';

import SingleResult from './SingleResult';
import ResultsHeader from './ResultsHeader';

export default function WeekResults(props){
  let results = [];
  for (let i=0; i<props.people.length; i++){
    results.push(<SingleResult key={i} person={props.people[i]}/>)
  }
  return(
    <div>
    <ResultsHeader week={props.week}/>
      {results}  
    </div>
  )
}