import actions from './actions';

function getVisibleItems(items, visibilityFilter) {
    let visibleItems = {};
    Object.keys(items).map((key) => {
        if (
            !visibilityFilter
            ||
            items[key].toLowerCase().indexOf(visibilityFilter.toLowerCase().trim())
            !== -1
        ) {
            visibleItems.push();
        }
    });
    return visibleItems;
}

export const reducers = (state = {
    items: {},
    selected: '',
    open: false,
    visibilityFilter: '',
    selectedItem: selected,
    selectedItemLabel: '',
    currentlyHighlighted: ''
}, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload
            };
        case 'SET_FILTER':
            return {
                ...state,
                visibilityFilter: action.payload
            };
        case 'TOGGLE_OPEN':
            return {
                ...state,
                open: !state.open
            };
        case 'SET_OPEN':
            return {
                ...state,
                open: action.payload
            };

    }
    return state;
};
