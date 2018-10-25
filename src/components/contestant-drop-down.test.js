import React from 'react';
import {shallow, render, mount} from 'enzyme';

import {addSelection} from '../actions/selection-actions';

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

  it('Should dispatch on selection', () => {
    const dispatch=jest.fn();
    const value = 'Blake';
    const wrapper = mount(<ContestantList week={3} contestants={contestantList} dispatch={dispatch}/>);
    const select = wrapper.find('select');
    select.simulate('change', {target: {value: value}});
    expect(dispatch).toHaveBeenCalledWith(addSelection(value, 3));
  })
});