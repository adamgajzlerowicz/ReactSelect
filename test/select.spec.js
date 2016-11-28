import React from 'react';
import {expect} from 'chai';
import {mount, shallow} from 'enzyme';
import {Select} from '../src';

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

    it("contains spec with an expectation", function () {
        const wrapper = mount(<Select items={items} onChange={onChange}/>);
        expect(wrapper.find('div')).to.have.length(8);
        expect(wrapper.find('.select-react-redux-container')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .selected')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container .input-container')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container .input-container input')).to.have.length(1);
        expect(wrapper.find('.select-react-redux-container .results-container div.item')).to.have.length(4);
    });

    describe('Open list', () => {

        it("opens on click", function () {
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("click");
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);

        });

        it("opens on arrow Enter", function () {
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("keyPress", {
                keyCode: 13
            });
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);
        });

        it("opens on arrow ArrowDown", function () {
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("keyPress", {
                keyCode: 40
            });
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);
        });

        it("opens on any character key", function () {
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("keyPress", {
                keyCode: 's'
            });
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(true);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(true);
        });
    });

    describe('Closes list', () => {

        it("closes on click", function () {
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.selected').simulate("click");
            wrapper.find('.selected').simulate("click");
            expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(false);
            expect(wrapper.find('.results-container').hasClass('open')).to.equal(false);

        });

        it("closes on escape", function () {
            const wrapper = mount(<Select items={items} onChange={onChange}/>);
            wrapper.find('.top-bar').simulate("change", {
                keyCode: 's'
            });

            wrapper.find('input').simulate("keyPress", {
                key: "Enter"
            });
            // console.log(wrapper.debug());
            // expect(wrapper.find('.selected').hasClass('selected-open')).to.equal(false);
        });

    });

    describe('Filters the list',()=>{
        it('with input filled in')
    })
});