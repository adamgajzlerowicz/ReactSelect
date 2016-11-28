import actions from './actions';

function getVisibleItems(items, filter) {
    let visibleItems = {};
    Object.keys(items).map((key) => {
        if (
            !filter
            ||
            items[key].toLowerCase().indexOf(filter.toLowerCase().trim())
            !== -1
        ) {
            visibleItems.push();
        }
    });
    return visibleItems;
}

export const reducers = (state = {
    items: getVisibleItems(items, ''),
    selected: '',
    open: false,
    filter: '',
    selectedItem: selected,
    selectedItemLabel: '',
    tabIndex: tabIndex,
    currentlyHighlighted: ''
}, action) => {
    switch (action) {
        case actions.SET_ITEMS:
            console.log(Object.assign({},
                ...state,
                {items: state}
            ));
    }
    return state;
};

