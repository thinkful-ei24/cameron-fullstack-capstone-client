import React from 'react';
import {shallow, render, mount} from 'enzyme';

import {ContestantList} from './ContestantDropDown';

describe('<ContestantList/>', () => {
  const contestantList=['Alex', 'Blake', 'Chase']
  const toAdd='Alex';
  it('Renders without crashing', () => {
    shallow(<ContestantList week={3} contestants={contestantList}/>);
  });

  it('Should have correct number of elements in dropdown', () => {
    const wrapper = shallow(<ContestantList week={3} contestants={contestantList}/>);
    const options = wrapper.find('option');
    const choices = ['Choose:', ...contestantList];
    expect(options).toHaveLength(contestantList.length + 1);
    options.forEach((choice, index) => {
      expect(choice.text()).toEqual(choices[index]);
    });
  })

  it('Should call callback on selection', () => {
    const wrapper = shallow(<ContestantList week={3} contestants={contestantList}/>);
    const select = wrapper.find('select');
    const callback = jest.fn();
    select.instance.onChange = callback();
    select.simulate('onChange');
    expect(callback).toHaveBeenCalled();
  })
});