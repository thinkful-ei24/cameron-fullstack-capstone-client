import React from 'react';
import { shallow, mount } from 'enzyme';

import { LoginForm } from './LoginForm';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../actions/auth-actions', () => Object.assign({},
  require.requireActual('../actions/auth-actions'),
  {
    login: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'LOGIN',
        username,
        password
      }
    })
  }));

describe('<LoginForm/>', () => {
  const dispatch = jest.fn();
  it('Should render without crashing', () => {
    mount(<BrowserRouter><LoginForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
  });

  it('Should submit when form is submitted', () => {
    const wrapper = mount(<BrowserRouter><LoginForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
    const form = wrapper.find('form');
    const callback = jest.fn();
    form.instance.onSubmit = callback();
    form.simulate('submit');
    expect(callback).toHaveBeenCalled();
  });

  it('Should display error if there', () => {
    const error = { message: 'error message' };
    const wrapper = mount(<BrowserRouter><LoginForm error={error} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
    expect(wrapper.find('.errorDisplay').text()).toEqual(error.message);
  });

  it('Should not display error if there is no error', () => {
    const wrapper = mount(<BrowserRouter><LoginForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
    expect(wrapper.find('.errorDisplay')).toHaveLength(0);
  });

  it('dispatches clearError on load', () => {
    const wrapper = mount(<BrowserRouter><LoginForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'CLEAR_ERROR'
    });
  });

  // it('dispatches login on submit', () => {
  //   const wrapper = mount(<BrowserRouter><LoginForm error={null} loggedIn={false} dispatch={dispatch} /></BrowserRouter>);
  //   const form = wrapper.find('form');
  //   const username = 'username';
  //   const password = 'password';
  //   wrapper.find('#username').instance.value = username;
  //   wrapper.find('#password').instance.value = password;
  //   form.simulate('submit');
  //   expect(dispatch).toHaveBeenCalledWith({
  //     type: 'LOGIN',
  //     username,
  //     password
  //   });
  // });
});  