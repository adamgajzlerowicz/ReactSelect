import React from 'react';
import {render} from 'react-dom';
import {Select} from '../../lib/index';

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda X11',
};

const onChange = (val) => {
    console.log('selected ' + val);
};

render((
    <div>
        <Select items={items} onChange={onChange}/>
    </div>
), document.getElementById('app'));

