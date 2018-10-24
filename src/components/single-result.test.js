import React from 'react';
import {shallow, mount} from 'enzyme';

import SingleResult from './SingleResult';

describe('<SingleResult/>', () => {
  const person={
    name: 'Blake',
    guess: 'correct'
  }
  it('Should render without crashing', () => {
    shallow(<SingleResult person={person} />);
  });

  it('Should have correct class and person names', () => {
    const wrapper = shallow(<SingleResult person={person} />);
    expect(wrapper.find(`.${person.guess}`)).toHaveLength(1);
    expect(wrapper.find('h3').text()).toEqual(person.name);
  })
});  