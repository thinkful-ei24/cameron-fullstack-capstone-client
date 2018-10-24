import React from 'react';
import {shallow, mount} from 'enzyme';

import {ResultsHeader} from './ResultsHeader';

describe('<ResultsHeader/>', () => {
  const scores=[1, 3, 5, 6, 9, 9, 9, 9, 9, 9];
  const week=2;
  it('Should render without crashing', () => {
    shallow(<ResultsHeader scores={scores} week={week} button='+'/>);
  });

  it('Should display the correct information', () => {
    const wrapper = shallow(<ResultsHeader scores={scores} week={week} button='+'/>);
    expect(wrapper.find('h2').text()).toEqual(`Week ${week}`);
    expect(wrapper.find('span').text()).toEqual(`${scores[week-1]} points`);
  });

  it('Should button to click', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<ResultsHeader scores={scores} week={week} button='+' onClick={onClick}/>);
    const button = wrapper.find('.expand-collapse-button');
    button.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});  