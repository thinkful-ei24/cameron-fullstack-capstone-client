import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import { Leaderboard } from './Leaderboard';
const mockFetchLeaderboardAction = {
  type: 'FETCH_LEADERBOARD'
};
jest.mock('../actions/leaderboard-actions', () => Object.assign({},
  require.requireActual('../actions/leaderboard-actions'),
  {
    fetchLeaderboard: jest.fn().mockImplementation(() => {
      return mockFetchLeaderboardAction;
    })
  }))

describe('<Leaderboard/>', () => {
  const dispatch = jest.fn();
  const leaderboard = [{ username: 'username', place: 1, score: 100 },
  { username: 'Bob', place: 2, score: 75 },
  { username: 'you', place: 3, score: 74 }];
  it('Renders without crashing', () => {
    shallow(<Leaderboard dispatch={dispatch} leaderboard={leaderboard} />);
  });
  it('dispatches fetchLeaderboard', () => {
    mount(<BrowserRouter>
      <Leaderboard dispatch={dispatch} leaderboard={leaderboard} />
    </BrowserRouter>);
    expect(dispatch).toHaveBeenCalledWith(mockFetchLeaderboardAction);
  });

});  