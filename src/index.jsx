import React from 'react';
import {render} from 'react-dom';
import {Select} from './Select';

const items = {
    'foo': 'I am option 1',
    'foo2': 'I am option 2',
    'blah': 'dupa dupa dupa',
    'fekkk': 'Harry potter'
};

const onChange = (val) => {
    console.log('selected ' + val);
};

render((
    <div>
        <Select items={items} onChange={onChange}/>
    </div>
), document.getElementById('app_small'));

