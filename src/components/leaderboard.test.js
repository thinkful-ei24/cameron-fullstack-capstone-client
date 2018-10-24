import React from 'react';
import {shallow, mount} from 'enzyme';

import {Leaderboard} from './Leaderboard';

describe('<Leaderboard/>', () => {
  const dispatch=jest.fn();
  it('Renders without crashing', () => {
    const dispatch = jest.fn();
    shallow(<Leaderboard dispatch={dispatch}/>);
  });
});  