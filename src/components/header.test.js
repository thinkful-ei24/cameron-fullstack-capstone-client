import React from 'react';
import {shallow, render, mount} from 'enzyme';

import {HeaderBar} from './Header';

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

});