import React from 'react';
import {shallow, mount} from 'enzyme';

import {WeekSelection} from './WeekSelection';

describe('<WeekSelection/>', () => {
  const week=3;
  const weekLength=15;
 
  it('Should render without crashing', () => {
    shallow(<WeekSelection week={week} weekLength={weekLength} />);
  });

  it('Should have correct components', () => {
    const wrapper = shallow(<WeekSelection week={week} weekLength={weekLength} />);
    expect(wrapper.find('h2').text()).toEqual(`Week ${week}`);
    expect(wrapper.find('.week-header')).toHaveLength(1);
    expect(wrapper.find('.expand-collapse-button')).toHaveLength(1);
  });

  it('Should have selection container when expanded is true', () => {
    const wrapper = shallow(<WeekSelection week={week} weekLength={weekLength} />);
    wrapper.setState({expanded: true});
    expect(wrapper.find('.selection-container')).toHaveLength(1);
  });

  it('Should not have selection container when expanded is false', () => {
    const wrapper = shallow(<WeekSelection week={week} weekLength={weekLength} />);
    wrapper.setState({expanded: false});
    expect(wrapper.find('.selection-container')).toHaveLength(0);
  });

  it('Should call callback when expand/collapse button is clicked', () => {
    const wrapper = shallow(<WeekSelection week={week} weekLength={weekLength} />);
    const callback=jest.fn();
    const button = wrapper.find('.expand-collapse-button');
    button.instance.onClick=callback();
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

});  
