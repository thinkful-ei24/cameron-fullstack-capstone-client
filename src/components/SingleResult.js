import React from 'react';
import './single-result.css';

export default function SingleResult(props){

  return(
    <div className={props.person.guess}>
      <h3>{props.person.name}</h3>
    </div>
  )
}