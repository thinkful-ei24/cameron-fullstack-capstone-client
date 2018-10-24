import React from 'react';
import {shallow, mount} from 'enzyme';

import {LoginForm} from './LoginForm';
import {BrowserRouter} from 'react-router-dom';

describe('<LoginForm/>', () => {
  const dispatch=jest.fn();
  it('Should render without crashing', () => {
    mount(<BrowserRouter><LoginForm error={null} loggedIn={false} dispatch={dispatch}/></BrowserRouter>);
  });
});  