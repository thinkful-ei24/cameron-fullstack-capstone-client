const remainingContestants = [21, 18, 15, 12, 9, 6, 4, 3, 2, 1];

export const filterChoices = (fullWeeks, week) => {
  const filteredWeeks = fullWeeks.filter(fullWeek => fullWeek < week );
  if(filteredWeeks.length > 0){
    filteredWeeks.sort((a,b) => b-a);
    return filteredWeeks[0];
  }
}

export const addSelection = (state, selection, week) => {
  let newObj={};
  for(let i=1; i<=week; i++){
    const weekName = `week${i}`;
    if (!state[weekName].includes(selection)){
      newObj[weekName] = [...state[weekName], selection]
      if(newObj[weekName].length >= remainingContestants[i-1]){
        if(newObj.fullWeeks){
          newObj.fullWeeks.push(i);
        }else{
          newObj.fullWeeks = [...state.fullWeeks, i];
        }
      }
    }
  }
  return newObj;
}

export const deleteChoice = (state, selection, week) => {
  let newObj={};
  for(let i=week; i<=10; i++){
    const weekName = `week${i}`;
    newObj[weekName] = state[weekName].filter(person => person !== selection);
    if(newObj[weekName].length < remainingContestants[i-1]){
      if(newObj.fullWeeks){
        newObj.fullWeeks = newObj.fullWeeks.filter(num => num !== i);
      }else{
        newObj.fullWeeks = state.fullWeeks.filter(num => num !== i);
      }
    }
  }
  return newObj;
}
