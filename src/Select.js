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
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            this.setState({
                open: false,
                filter: ''
            });
            this.setState({
                currentlyHighlighted: '',
            });
            this.getVisibleItems();
            if (ReactDom.findDOMNode(this).contains(e.target)) {
                this.link.focus();
            }
        }
    });

    document.addEventListener('click', () => {
        if (!ReactDom.findDOMNode(this).contains(e.target)) {
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
    console.log(props);

    const visibleItems = Object.keys(props.items).map((item) => {
        /*
         const className = (
         (key == this.state.currentlyHighlighted && this.state.selectedItem == '')
         ||
         (key == this.state.selectedItem && this.state.currentlyHighlighted == '')
         ||
         (
         this.state.currentlyHighlighted != ''
         &&
         this.state.selectedItem != ''
         &&
         key == this.state.currentlyHighlighted
         )
         )
         ? 'item item-selected' : 'item';
         */

        return (
            <div
                onClick={(item) => {
                    props.onClick(item);
                }}
                key={item}
                className={null}
            >
                {props.items[item]}
            </div>
        )

    });

    return (
        <div className="select-react-redux-container">
            <a href="#"
               tabIndex={props.tabIndex}
               onClick={() => {
                   console.log('lkjsdf');
                   props.topBarOnClick
               }}
               onKeyPress={() => {
                   this.setState({open: true})
               }}
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
                        onKeyPress={props.inputOnKeyPress}
                        onChange={props.inputOnChange}
                        onKeyDown={props.inputOnKeyDown}
                    />
                </div>
                {visibleItems || NoItems}
            </div>
        </div>
    );
};

export const Select = ({items, selected = '', tabIndex = null, onClick}) => {
    const store = createStore(reducers);
    store.dispatch({type: actions.SET_ITEMS, payload: items})
    const mapStateToProps = (state = {}) => {
        return state;
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            submit: () => {
                onClick()
            },
            linkOnKeyDown: () => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    console.log('should open the thing');
                }
            },
            inputOnKeyPress: () => {
                if (e.key === 'Esc') {
                    console.log('Esc');
                }

                if (e.key === 'Enter') {
                    console.log('Enter');
                }
            },
            inputOnChange: () => {
                console.log('changed input');
            },
            inputOnKeyDown: () => {
                if (e.key === 'ArrowDown') {
                    console.log('arrow down');
                }

                if (e.key === 'ArrowUp') {
                    console.log('arrow up');
                }
            },
            topBarOnClick: () => {
                dispatch({type: actions.SET_OPEN})
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
