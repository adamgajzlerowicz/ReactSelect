## ReactSelect

A searchable select box, similar to select2, but compatible with react and redux.
 
usage: 

```
import React from 'react';
import {render} from 'react-dom';
import {Select} from './Select';

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda X11',
    'item3': 'Volvo V50',
    'item4': 'Audi 80'
};

const onChange = (val) => {
    console.log(val);
};

render((
    <div>
        <Select items={items} onChange={onChange}/>
    </div>
), document.getElementById('app_small'));
```