import React from 'react';
import ContestantDropDown from './ContestantDropDown';
import Selections from './Selections';

export default function WeekSelection(props){

  return (
    <div>
      <h2>{`Week ${props.week}`}</h2>
      <ContestantDropDown week={props.week} />
      <Selections week={props.week} />
    </div>
  )
}