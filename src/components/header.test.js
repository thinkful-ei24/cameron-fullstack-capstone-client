import React from 'react';
import {shallow, render, mount} from 'enzyme';

import {HeaderBar} from './Header';
import {toggleInfoDisplay, clearAuth} from '../actions/auth-actions';

describe('<HeaderBar/>', () => {
  it('Renders without crashing', () => {
    shallow(<HeaderBar loggedIn={true} infoDisplay={false}/>);
  });

  it('Renders info button', () => {
    const wrapper = shallow(<HeaderBar loggedIn={true} infoDisplay={false}/>);
    expect(wrapper.find('.info-button')).toHaveLength(1);
    expect(wrapper.find('.close-button')).toHaveLength(0);
  });

  it('Renders logout button when logged in', () => {
    const wrapper = shallow(<HeaderBar loggedIn={true} infoDisplay={false}/>);
    expect(wrapper.find('.logout')).toHaveLength(1);
  });

  it('Does not renders logout button when not logged in', () => {
    const wrapper = shallow(<HeaderBar loggedIn={false} infoDisplay={false}/>);
    expect(wrapper.find('.logout')).toHaveLength(0);
  });

  it('Renders close button when info is displayed', () => {
    const wrapper = shallow(<HeaderBar loggedIn={true} infoDisplay={true}/>);
    expect(wrapper.find('.close-button')).toHaveLength(1);
    expect(wrapper.find('.info-button')).toHaveLength(0);
  });

  it('Calls logout function when logout is clicked', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<HeaderBar loggedIn={true} infoDisplay={false} dispatch={dispatch}/>);
    const logout = wrapper.find('.logout');
    const callback = jest.fn();
    logout.instance.onClick = callback();
    logout.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

});