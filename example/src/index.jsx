import React from 'react';
import {render} from 'react-dom';
import {Select} from '../../lib';

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda 6',
    'item3': 'Mazda 3',
    'item4': 'Rover Discovery Sport'
};

const onChange = (val) => {
    console.log('selected ' + val);
};

render((
    <div>
        <Select items={items} onChange={onChange}/>
    </div>
), document.getElementById('app'));

