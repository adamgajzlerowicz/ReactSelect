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
            visibilityFilter: 'lkjsadlfkjsdlkf',
            items: {foo: 'bar'}
        };

        const newState =
            {
                visibilityFilter: 'fff',
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
    );

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
    );

    it('selects next item', () => {
        const oldState = {
            items: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item2'
        };
        const newState = {
            items: {
                item1: 'blah',
                item2: 'foo',
                item3: 'zork'
            },
            currentlyHighlighted: 'item3'
        };

        freeze(oldState);
        freeze(newState);

        expect(reducers(oldState, {type: actions.SET_NEXT_HIGHLIGHTED})).toEqual(newState);
    });

    it('selects previous item');
    it('sets currently highlighted');
    it('sets selected item and its label');

});