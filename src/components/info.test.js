import React from 'react';
import {shallow, render, mount} from 'enzyme';

import Info from './Info';

describe('<Info/>', () => {
  it('Renders without crashing', () => {
    shallow(<Info />);
  });
});  