import React from 'react';
import {shallow, mount} from 'enzyme';

import {WeekHolder} from './WeekHolder';

jest.mock('../actions/selection-actions', () => Object.assign({},
  require.requireActual('../actions/selection-actions'),
  {
    getSelection: jest.fn().mockImplementation((jwt) => {
      return {
        type: 'GET_SELECTION',
        jwt
      }
    }),
    submitGuesses: jest.fn().mockImplementation((jwt,guesses) => {
      return {
        type: 'SUBMIT_GUESSES',
        jwt,
        guesses
      }
    }),
  }));

describe('<WeekHolder/>', () => {
  const dispatch=jest.fn();
  const week1=['Alex', 'Blake', 'Garrett', 'Colton', 'Jake', 'Chris', 'Jean Blanc', 'Jason', 'Ryan', 'Christian', 'Christon', 'David', 'Jordan', 'Kamil', 'Leo', 'Trent', 'Wills', 'John', 'Joe', 'Chase', 'Clay'];
  const week2=['Alex', 'Blake', 'Garrett', 'Colton', 'Jake', 'Chris', 'Jean Blanc', 'Jason', 'Ryan', 'Christian', 'Christon', 'David', 'Jordan', 'Kamil', 'Leo', 'Trent', 'Wills', 'John'];
  const week3=['Alex', 'Blake', 'Garrett', 'Colton', 'Jake', 'Chris', 'Jean Blanc', 'Jason', 'Ryan', 'Christian', 'Christon', 'David', 'Jordan', 'Kamil', 'Leo'];
  const week4=['Alex', 'Blake', 'Garrett', 'Colton', 'Jake', 'Chris', 'Jean Blanc', 'Jason', 'Ryan', 'Christian', 'Christon', 'David'];
  const week5=['Alex', 'Blake', 'Garrett', 'Colton', 'Jake', 'Chris', 'Jean Blanc', 'Jason', 'Ryan'];
  const week6=['Alex', 'Blake', 'Garrett', 'Colton', 'Jake', 'Chris'];
  const week7=['Alex', 'Blake', 'Garrett', 'Colton'];
  const week8=['Alex', 'Blake', 'Garrett'];
  const week9=['Alex', 'Blake'];
  const week10=['Alex'];
  const error = {message: 'error message'};
  it('Should render without crashing', () => {
    shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} />);
  });

  it('Should have correct elements', () => {
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} />);
    expect(wrapper.find('.selection-instructions')).toHaveLength(1);
    expect(wrapper.find('.submit-guesses')).toHaveLength(1);
    expect(wrapper.find('.errorDisplay')).toHaveLength(0); 
  });

  it('Should display error if there is an error', () => {
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} error={error}/>);
    expect(wrapper.find('.errorDisplay')).toHaveLength(1); 
  });

  it('Should call function if submit is clicked', () => {
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} />);
    const callback=jest.fn();
    const submit = wrapper.find('.submit-guesses');
    submit.instance.onClick=callback();
    submit.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it('Should have disabled submit button when selection arrays are not full', () => {
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={[]} />);
    const submit = wrapper.find('.submit-guesses');
    expect(submit.prop('disabled')).toBe(true);  
  });
  
  it('Should have enabled submit button when selection arrays are full', () => {
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} />);
    const submit = wrapper.find('.submit-guesses');
    expect(submit.prop('disabled')).toBe(false);  
  });

  it('dispatches submitGuesses on submit', () => {
    const jwt = 'asdfljdafsadfj';
    const guesses = {week1, week2, week3, week4, week5, week6, week7, week8, week9, week10}
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} jwt={jwt}/>);
    const submit = wrapper.find('.submit-guesses');
    submit.simulate('click');  
      expect(dispatch).toHaveBeenCalledWith({
      type: 'SUBMIT_GUESSES',
      jwt,
      guesses
    });
  });

  it('dispatches getSelection on load', () => {
    const jwt = 'asdfljdafsadfj';
    const wrapper = shallow(<WeekHolder dispatch={dispatch} week1={week1} week2={week2} week3={week3} week4={week4}
      week5={week5} week6={week6} week7={week7} week8={week8} week9={week9} week10={week10} jwt={jwt}/>);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_SELECTION',
      jwt
    });
  });
});  
