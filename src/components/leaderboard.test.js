import React from 'react';
import {shallow, mount} from 'enzyme';

import {Leaderboard} from './Leaderboard';

describe('<Leaderboard/>', () => {
  const dispatch=jest.fn();
  const leaderboard = [{username: 'username', place: 1, score: 100},
   {username: 'Bob', place: 2, score: 75},
   {username: 'you', place: 3, score: 74}];
  it('Renders without crashing', () => {
    shallow(<Leaderboard dispatch={dispatch} leaderboard={leaderboard}/>);
  });

});  