import React from 'react';
import {render} from 'react-dom';
import {Select} from '../src';
import {createStore, applyMiddleware} from 'redux';

const items = {
    'item1': 'Mercedes-benz GLE',
    'item2': 'Mazda 6',
    'item3': 'Mazda 3',
    'item4': 'Rover Discovery Sport'
};



const reducer = (state = {item: ''}, action) => {
    console.log(action)
    return {
        ...state,
        item: action.payload
    };
};

let store = createStore(reducer);


const App = ({...props}) => {
    const onChange = (val) => {
        props.foo(val);
    };
    return (
        <div>
            <Select items={items} onChange={onChange} tabIndex="1"/>
            <Select items={items} onChange={onChange} tabIndex="2" selected={props}/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        selected: '',
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        foo: (item)=> {
            dispatch({type: 'kjhsdfkjhgsdfkjh', payload: item})
        }

    }
};

export const ConnectedApp = connect(
    mapStateToProps, mapDispatchToProps
)(App);

render((
    <div>
        <Provider store={store}>
            <ConnectedApp />
        </Provider>

    </div>
), document.getElementById('app'));

