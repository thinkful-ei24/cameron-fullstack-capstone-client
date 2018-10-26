import React from 'react';
import {shallow, mount} from 'enzyme';

import {SignUpForm} from './SignUpForm';
import {BrowserRouter} from 'react-router-dom';

import {clearError} from '../actions/auth-actions';

jest.mock('../actions/signup-actions', () => Object.assign({},
  require.requireActual('../actions/signup-actions'),
  {
    signup: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'SIGNUP',
        username,
        password
      }
    })
  }));

describe('<SignUpForm/>', () => {
  const dispatch=jest.fn();
  it('Should render without crashing', () => {
    mount(<BrowserRouter><SignUpForm error={null} loggedIn={false} dispatch={dispatch}/></BrowserRouter>);
  });

  it('Should submit when form is submitted', () => {
    const wrapper = mount(<BrowserRouter><SignUpForm error={null} loggedIn={false} dispatch={dispatch}/></BrowserRouter>);
    const form = wrapper.find('form');
    const callback = jest.fn();
    form.instance.onSubmit = callback();
    form.simulate('submit');
    expect(callback).toHaveBeenCalled();
  });

  it('Should display error if there', () => {
    const error={message: 'error message'};
    const wrapper = mount(<BrowserRouter><SignUpForm error={error} loggedIn={false} dispatch={dispatch}/></BrowserRouter>);
    expect(wrapper.find('.errorDisplay').text()).toEqual(error.message);
  });

  it('Should not display error if there is no error', () => {
    const wrapper = mount(<BrowserRouter><SignUpForm error={null} loggedIn={false} dispatch={dispatch}/></BrowserRouter>);
    expect(wrapper.find('.errorDisplay')).toHaveLength(0);
  });

  it('dispatches clearError on load', () => {
    const wrapper = mount(<BrowserRouter><SignUpForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
    expect(dispatch).toHaveBeenCalledWith(clearError());
  });

  it('dispatches signup on submit', () => {
    const wrapper = mount(<BrowserRouter><SignUpForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
    const form = wrapper.find('form');
    const username = 'username';
    const password = 'password';
    wrapper.find('#username').instance().value = username;
    wrapper.find('#password').instance().value = password;
    form.simulate('submit');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SIGNUP',
      username,
      password
    });
  });
});  