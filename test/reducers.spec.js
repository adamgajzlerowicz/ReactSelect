'use strict';
import {reducers} from '../src/reducers';
import actions from '../src/actions';
import {expect} from 'chai';
import freeze from 'deep-freeze';


describe('Reducers', () => {

    it('sets initial items', () => {
        const items = {
            item1: 'blah',
            item2: 'zumba',
            item3: 'galoty',
            item4: 'franciszek',
            item5: 'pan zaloba'
        };
        const newState = {
            items: {
                item1: 'blah',
                item2: 'zumba',
                item3: 'galoty',
                item4: 'franciszek',
                item5: 'pan zaloba'
            }
        };

        freeze(items);
        console.log(reducers(items, actions.SET_ITEMS).items);

        // console.log(newState);
        // expect(reducers(items, actions.SET_ITEMS)).to.equal(newState);
    });

    // it('returns correctly filtered list of items', () => {
    //     const state = {
    //         item1: 'blah',
    //         item2: 'zumba',
    //         item3: 'galoty',
    //         item4: 'franciszek',
    //         item5: 'pan zaloba'
    //     };
    //
    //     const filter = 'fra';
    //
    //     const newState = {
    //         item1: 'blah',
    //         item2: 'zumba',
    //         item3: 'galoty',
    //         item4: 'franciszek',
    //         item5: 'pan zaloba'
    //     };
    //
    //     freeze(state);
    //
    //     expect(reducers(state, actions.SET_)).to.equal(true);
    //
    //     const filter2 = 'fra';
    //
    //     const newState2 = {
    //         item1: 'blah',
    //         item2: 'zumba',
    //         item3: 'galoty',
    //         item4: 'franciszek',
    //         item5: 'pan zaloba'
    //     };
    //
    //     expect(true).to.equal(freeze(true));
    //     const filter3 = 'fra';
    //
    //     const newState3 = {
    //         item1: 'blah',
    //         item2: 'zumba',
    //         item3: 'galoty',
    //         item4: 'franciszek',
    //         item5: 'pan zaloba'
    //     };
    //
    //
    //     expect(true).to.equal(freeze(true));
    //     const filter4 = 'fra';
    //
    //     const newState4 = {
    //         item1: 'blah',
    //         item2: 'zumba',
    //         item3: 'galoty',
    //         item4: 'franciszek',
    //         item5: 'pan zaloba'
    //     };
    //
    //     freeze(state);
    //
    //     expect(true).to.equal(freeze(true));
    //
    // })

});