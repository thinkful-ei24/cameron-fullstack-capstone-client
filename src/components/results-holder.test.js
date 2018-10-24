import React from 'react';
import { shallow, mount } from 'enzyme';

import { ResultsHolder } from './ResultsHolder';

describe('<ResultsHolder/>', () => {
  const dispatch = jest.fn();
  const error = {message: 'error message'};
  const results = { "feedback": { "week1": [{ "name": "Chris", "guess": "correct" }, { "name": "Connor", "guess": "correct" }, { "name": "Jason", "guess": "correct" }, { "name": "Lincoln", "guess": "correct" }, { "name": "Joe", "guess": "incorrect" }, { "name": "Christian", "guess": "incorrect" }, { "name": "Blake", "guess": "correct" }, { "name": "Garrett", "guess": "correct" }, { "name": "Leo", "guess": "correct" }, { "name": "Trent", "guess": "correct" }, { "name": "Jordan", "guess": "correct" }, { "name": "Darius", "guess": "incorrect" }, { "name": "Jean Blanc", "guess": "correct" }, { "name": "Christon", "guess": "correct" }, { "name": "David", "guess": "correct" }, { "name": "Clay", "guess": "correct" }, { "name": "John", "guess": "correct" }, { "name": "Nick", "guess": "correct" }, { "name": "Wills", "guess": "correct" }, { "name": "Chase", "guess": "incorrect" }, { "name": "Grant", "guess": "incorrect" }], "week2": [{ "name": "Jason", "guess": "correct" }, { "name": "Garrett", "guess": "correct" }, { "name": "Blake", "guess": "correct" }, { "name": "Jean Blanc", "guess": "correct" }, { "name": "Wills", "guess": "correct" }, { "name": "Grant", "guess": "incorrect" }, { "name": "Connor", "guess": "correct" }, { "name": "Christian", "guess": "incorrect" }, { "name": "Jordan", "guess": "correct" }, { "name": "Leo", "guess": "correct" }, { "name": "David", "guess": "correct" }, { "name": "Nick", "guess": "correct" }, { "name": "John", "guess": "correct" }, { "name": "Clay", "guess": "correct" }, { "name": "Joe", "guess": "incorrect" }, { "name": "Lincoln", "guess": "correct" }, { "name": "Christon", "guess": "correct" }, { "name": "Chris", "guess": "correct" }], "week3": [{ "name": "Garrett", "guess": "correct" }, { "name": "Grant", "guess": "incorrect" }, { "name": "Wills", "guess": "correct" }, { "name": "Blake", "guess": "correct" }, { "name": "Nick", "guess": "correct" }, { "name": "Lincoln", "guess": "correct" }, { "name": "Joe", "guess": "incorrect" }, { "name": "Clay", "guess": "incorrect" }, { "name": "Leo", "guess": "correct" }, { "name": "Christian", "guess": "incorrect" }, { "name": "Christon", "guess": "correct" }, { "name": "Connor", "guess": "correct" }, { "name": "Jason", "guess": "correct" }, { "name": "John", "guess": "correct" }, { "name": "Jordan", "guess": "correct" }], "week4": [{ "name": "Grant", "guess": "incorrect" }, { "name": "Nick", "guess": "incorrect" }, { "name": "Clay", "guess": "incorrect" }, { "name": "Blake", "guess": "correct" }, { "name": "Christian", "guess": "incorrect" }, { "name": "John", "guess": "correct" }, { "name": "Joe", "guess": "incorrect" }, { "name": "Garrett", "guess": "correct" }, { "name": "Christon", "guess": "incorrect" }, { "name": "Jason", "guess": "correct" }, { "name": "Lincoln", "guess": "correct" }, { "name": "Jordan", "guess": "correct" }], "week5": [{ "name": "Blake", "guess": "correct" }, { "name": "Garrett", "guess": "correct" }, { "name": "Jordan", "guess": "incorrect" }, { "name": "Nick", "guess": "incorrect" }, { "name": "Christian", "guess": "incorrect" }, { "name": "Joe", "guess": "incorrect" }, { "name": "Clay", "guess": "incorrect" }, { "name": "Jason", "guess": "correct" }, { "name": "Christon", "guess": "incorrect" }], "week6": [{ "name": "Garrett", "guess": "correct" }, { "name": "Joe", "guess": "incorrect" }, { "name": "Blake", "guess": "correct" }, { "name": "Clay", "guess": "incorrect" }, { "name": "Christon", "guess": "incorrect" }, { "name": "Jordan", "guess": "incorrect" }], "week7": [{ "name": "Blake", "guess": "correct" }, { "name": "Garrett", "guess": "correct" }, { "name": "Clay", "guess": "incorrect" }, { "name": "Christon", "guess": "incorrect" }], "week8": [{ "name": "Garrett", "guess": "correct" }, { "name": "Blake", "guess": "correct" }, { "name": "Christon", "guess": "incorrect" }], "week9": [{ "name": "Garrett", "guess": "" }, { "name": "Blake", "guess": "" }], "week10": [{ "name": "Blake", "guess": "" }] }, "status": "results", "scores": [16, 30, 33, 24, 15, 12, 14, 16, "", ""] }
  it('Should render without crashing', () => {
    shallow(<ResultsHolder dispatch={dispatch} results={results} />);
  });

  it('Should render Week Results and link and no error', () => {
    const wrapper = shallow(<ResultsHolder dispatch={dispatch} results={results} />);
    const weekResults = wrapper.find('WeekResults');
    expect(weekResults).toHaveLength(10); 
    const errorDisplay = wrapper.find('.errorDisplay');
    expect(errorDisplay).toHaveLength(0);
    const link = wrapper.find('.link');
    expect(link).toHaveLength(1); 
  });

  it('Should display error box if error is not null', () => {
    const wrapper = shallow(<ResultsHolder dispatch={dispatch} results={results} error={error}/>);
    const errorDisplay = wrapper.find('.errorDisplay');
    expect(errorDisplay).toHaveLength(1); 
    expect(errorDisplay.text()).toEqual(error.message);
  });
});  