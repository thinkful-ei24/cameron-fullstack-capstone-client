import React from 'react';
import ContestantDropDown from './ContestantDropDown';

export default function WeekSelection(props){

  return (
    <div>
      <h2>{`Week ${props.week}`}</h2>
      <ContestantDropDown week={props.week} />
    </div>
  )
}