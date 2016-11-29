'use strict';
import {reducers} from '../src/reducers';
import actions from '../src/actions';
import expect, {createSpy, spyOn, isSpy} from 'expect'
import freeze from 'deep-freeze';

describe('Reducers', () => {

    it('sets initial items', () => {
        const items = {
            item1: 'blah',
            item2: 'foo',
            item3: 'zork'
        };

        const oldState = {
            items: {}
        };

        const newState =
            {
                items: {
                    item1: 'blah',
                    item2: 'foo',
                    item3: 'zork'
                }
            };

        freeze(oldState);
        freeze(items);

        expect(reducers(oldState, {
            type: actions.SET_ITEMS, payload: items
        })).toEqual(newState);

    });

    it('sets filter', () => {
        const filter = 'fff';

        const oldState = {
            filter: 'lkjsadlfkjsdlkf',
            items: {foo: 'bar'}
        };

        const newState =
            {
                filter: 'fff',
                items: {foo: 'bar'}
            };

        freeze(oldState);
        freeze(filter);

        expect(reducers(oldState, {
            type: actions.SET_FILTER,
            payload: filter
        })).toEqual(newState);

    });
    it('changes state of opened', () => {

            const trueState = {
                items: {foo: 'barr'},
                open: true
            };

            const falseState = {
                items: {foo: 'barr'},
                open: false
            };

            freeze(trueState);
            freeze(falseState);

            expect(reducers(trueState, {type: actions.TOGGLE_OPEN})).toEqual(falseState);
            expect(reducers(trueState, {type: actions.SET_OPEN, payload: false})).toEqual(falseState);
            expect(reducers(falseState, {type: actions.SET_OPEN, payload: true})).toEqual(trueState);
        }
    )
});