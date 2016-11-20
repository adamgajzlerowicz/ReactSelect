import React from 'react';
import {render} from 'react-dom';
import {Select} from '../../src/index';

const items = {};

const onChange = (val) => {
    console.log('selected ' + val);
};

render((
    <div>
        <Select items={items} onChange={onChange}/>
    </div>
), document.getElementById('app'));

