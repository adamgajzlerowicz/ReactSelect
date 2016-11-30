import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import actions from './actions';
import {reducers} from './reducers';
const ReactDom = require('react-dom');


const NoItems = () => {
    return (
        <div
            key={null}
            className="item item-no-results"
        >No results found</div>
    );
};

const addListeners = ({}) => {
    document.addEventListener('click', () => {
        if (!ReactDom.findDOMNode(this).contains(e.target)) {
            console.log('needs to close');
            // this.setState({
            //     open: false,
            //     filter: ''
            // }, () => {
            //     this.getVisibleItems();
            // })
        }
    }, false);
};
const Presentation = ({...props}) => {
    const visibleItems = Object.keys(props.visibleItems).map((item) => {
        return (
            <div
                onClick={() => {
                    props.submit({
                        selected: item,
                        selectedItemLabel: props.items[item]
                    })
                }}
                key={item}
                className={
                    (item == props.currentlyHighlighted)
                    ||
                    (item == props.selectedItem)
                        ?
                        'item item-selected' : 'item'
                }
            >
                {props.items[item]}
            </div>
        )

    });
    return (
        <div className="select-react-redux-container">
            <a href="#"
               tabIndex={props.tabIndex}
               onClick={props.topBarOnClick}
               onKeyPress={props.topBarPress}
               onKeyDown={props.linkOnKeyDown}
               className={props.open ? 'selected selected-open' : 'selected'}

            >
                <div
                    className={props.items.length == 0 ? 'top-bar top-bar-empty' : 'top-bar'}>
                    {props.selectedItemLabel
                        ? props.selectedItemLabel
                        : props.items.length == 0 ? 'No options available' : 'Please select...'}
                </div>
            </a>

            <div className={props.open ? 'results-container open' : 'results-container' }>

                <div className="input-container">
                    <input
                        type="text"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        autoComplete="off"
                        ref={search => search && search.focus()}
                        value={props.filter}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                props.submit({
                                    selected: props.currentlyHighlighted,
                                    selectedItemLabel: props.items[props.currentlyHighlighted]
                                });
                            }
                        }}
                        onChange={props.inputOnChange}
                        onKeyDown={props.inputOnKeyDown}
                    />
                </div>
                {visibleItems.length > 0 ? visibleItems : <NoItems/>}
            </div>
        </div>
    );
};

export const Select = ({items, selected = null, tabIndex = null, onChange}) => {

    const store = createStore(reducers);

    window.store = store;

    store.dispatch({type: actions.SET_ITEMS, payload: items});

    if (selected) {
        store.dispatch({
            type: actions.SET_SELECTED, payload: {
                selected: selected,
                selectedItemLabel: items.selected
            }
        });
    }

    if (tabIndex) {
        store.dispatch({type: actions.SET_TABINDEX, payload: tabIndex})
    }

    const mapStateToProps = (state = {}) => {
        return state;
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            submit: (item) => {
                dispatch({type: actions.SET_SELECTED, payload: item});
                onChange(item.selected);
            },
            linkOnKeyDown: () => {
                dispatch({type: actions.SET_OPEN, payload: true})
            },

            inputOnChange: (e) => {
                dispatch({type: actions.SET_FILTER, payload: e.target.value})
            },
            inputOnKeyDown: (e) => {
                if (e.key === 'ArrowDown') {
                    dispatch({type: actions.SET_NEXT_HIGHLIGHTED, payload: false})
                }

                if (e.key === 'ArrowUp') {
                    dispatch({type: actions.SET_PREV_HIGHLIGHTED, payload: false})
                }

                if (e.key === 'Escape') {
                    dispatch({type: actions.SET_OPEN, payload: false})
                }
            },
            topBarOnClick: () => {
                dispatch({type: actions.TOGGLE_OPEN})
            },
            topBarPress: () => {
                dispatch({type: actions.SET_OPEN, payload: true})
            }
        }
    };

    const SelectWithStore = connect(
        mapStateToProps,
        mapDispatchToProps
    )(Presentation);

    return (
        <Provider store={store}>
            <SelectWithStore />
        </Provider>
    )
};
