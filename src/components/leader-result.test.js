import React from 'react';
import {shallow, render, mount} from 'enzyme';

import LeaderResult from './LeaderResult';

describe('<LeaderResult/>', () => {
  const person={
    place: 1,
    username: 'username', 
    score: 33
  };
  it('Renders without crashing', () => {
    shallow(<LeaderResult person={person}/>);
  });

  it('Should have username in h2', () => {
    const wrapper = shallow(<LeaderResult person={person}/>);
    const h2 = wrapper.find('h2');
    expect(h2).toHaveLength(1);
    expect(h2.text()).toEqual(person.username);
  });

  it('Should have place in correct spot', () => {
    const wrapper = shallow(<LeaderResult person={person}/>);
    const place = wrapper.find('.place');
    expect(place).toHaveLength(1);
    expect(place.text()).toEqual(String(person.place));
  });

  it('Should have score in correct spot', () => {
    const wrapper = shallow(<LeaderResult person={person}/>);
    const score = wrapper.find('.leaderScore');
    expect(score).toHaveLength(1);
    expect(score.text()).toEqual(String(person.score));
  });

  it('Should have correct class', () => {
    const wrapper = shallow(<LeaderResult person={person} className='className'/>);
    const classTest = wrapper.find('.className');
    expect(classTest).toHaveLength(1);
  });
});  