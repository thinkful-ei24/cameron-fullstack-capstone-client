import React from 'react';
import { shallow, mount } from 'enzyme';

import { Selections } from './Selections';

describe('<Selections/>', () => {
  const contestantList = ['Alex', 'Blake', 'Garrett', 'Colton'];
  const week = 5;  
  it('Should render without crashing', () => {
    shallow(<Selections contestants={contestantList} week={week}/>);
  });

});  