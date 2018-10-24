import React from 'react';
import {shallow, mount} from 'enzyme';

import WeekResults from './WeekResults';

describe('<WeekResults/>', () => {
  const week=3;
  const people=[{name: 'Blake', guess:'correct'}, {name: 'Connor', guess: 'incorrect'}, {name: 'Chris', guess:'correct'}];
  
  it('Should render without crashing', () => {
    shallow(<WeekResults week={week} people={people} />);
  });

  it('Should have results container when expanded is true', () => {
    const wrapper = shallow(<WeekResults week={week} people={people} />);
    wrapper.setState({expanded: true});
    expect(wrapper.find('.results-container')).toHaveLength(1);
  });

  it('Should not have results container when expanded is false', () => {
    const wrapper = shallow(<WeekResults week={week} people={people} />);
    wrapper.setState({expanded: false});
    expect(wrapper.find('.results-container')).toHaveLength(0);
  });

});  
