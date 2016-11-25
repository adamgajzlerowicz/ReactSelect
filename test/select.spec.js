import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import {Select} from '../lib';

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda 6',
    'item3': 'Mazda 3',
    'item4': 'Rover Discovery Sport'
};

const onChange = (val) => {
    console.log('selected ' + val);
};


describe('<Select />', () => {

    it("contains spec with an expectation", function() {
        const wrapper = shallow(<Select items={items} onChange={onChange}/>);
        expect(wrapper.find('div')).to.have.length(4);
    });

});