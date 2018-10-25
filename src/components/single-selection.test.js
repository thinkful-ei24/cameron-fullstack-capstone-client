import React from 'react';
import {shallow, mount} from 'enzyme';

import {SingleSelection} from './SingleSeleciton';
import {deleteSelection} from '../actions/selection-actions';

describe('<SingleSelection/>', () => {
  const contestant='Blake';
  const week = 1;
  const dispatch = jest.fn();
  it('Should render without crashing', () => {
    shallow(<SingleSelection contestant={contestant} week={week} dispatch={dispatch}/>);
  });

  it('Should have correct name', () => {
    const wrapper = shallow(<SingleSelection contestant={contestant} week={week} dispatch={dispatch}/>);
    expect(wrapper.find('h3').text()).toEqual(contestant);
  });

  it('Should call dispatch when delete is pressed', () => {
    const wrapper = shallow(<SingleSelection contestant={contestant} week={week} dispatch={dispatch}/>);
    const deleteButton = wrapper.find('.delete-button');
    deleteButton.simulate('click');
    expect(dispatch).toHaveBeenCalledWith(deleteSelection(contestant, week));
  });
});  